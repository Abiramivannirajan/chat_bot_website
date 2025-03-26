import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { v4 as uuidv4 } from 'uuid';
@Injectable({
  providedIn: 'root'
})
export class couchchatbotService {

  private chatApiUrl = 'http://127.0.0.1:5000/chat'; // Flask backend URL
  private predictApiUrl = 'http://127.0.0.1:5000/predict'; // Flask API URL

  private baseUrl = 'https://192.168.57.185:5984/dpg_chatbot';
  private username = 'd_couchdb';
  private password = 'Welcome#2';

  private headers = new HttpHeaders({
    'Authorization': 'Basic ' + btoa(`${this.username}:${this.password}`),
    'Content-Type': 'application/json',
  });

  constructor(private http: HttpClient) { }
 
  getBotResponse(userInput: string): Observable<string> {
    return this.http.post<{ response: string }>(this.chatApiUrl, { user_input: userInput })
      .pipe(map(res => res.response) // Extract only the response text
      );
  }
  sendMessage(query: string): Observable<any> {
    return this.http.post(this.chatApiUrl, { query });
  }
  getSkillPrediction(answers: string[]): Observable<any> {
    return this.http.post<any>(this.predictApiUrl, { answers });
  }

  //for send email
  onJobApplicationEmail(data: any) {
    return this.http.post<any>(`http://localhost:8000/apply-job`, data);
  }
  // Fetch job details by job ID

  getJobById(jobId: string): Observable<any> {
    const url = `${this.baseUrl}/${jobId}`;  // Make sure the URL matches your API endpoint
    return this.http.get<any>(url, { headers: this.headers });
  }

  // Add a new job (if required)
  addJob(jobData: any): Observable<any> {
    return this.http.post<any>(this.baseUrl, jobData, { headers: this.headers });
  }
  // Get a list of jobs (if needed)
  getJobs(): Observable<any> {
    const url = `${this.baseUrl}/_design/view/_view/jobdetails_by_id?include_docs=true`;
    return this.http.get<any>(url, { headers: this.headers });
  }

  // For getcardetails method:
  getCardDetails(): Observable<any> {
    const url = `${this.baseUrl}/_design/view/_view/cardDetails_by_imageurl?include_docs=true`;
    return this.http.get<any>(url, { headers: this.headers });
  }

  // For addcarddetails method:
  addCardDetails(cardData: any): Observable<any> {
    const url = `${this.baseUrl}`; // Assuming this URL is for the API endpoint to add card data
    return this.http.post<any>(url, cardData, { headers: this.headers });
  }
  getParticularUserApplications(userId: string) {
    const url = `${this.baseUrl}/_design/view/_view/application_by_userid?key="${userId}"&include_docs=true`
    return this.http.get(url, { headers: this.headers });  //current user id here
  }
 
  createJobApplication(applicationDetail: { userId: string, jobId: string, applicationStatus: string, type: string }) {
    const url = `${this.baseUrl}`
    return this.http.post(url, { _id: `application_2_${uuidv4()}`, data: applicationDetail }, { headers: this.headers });
  }


  changeJobStatus(applicationId: string, applicationDetail: any) {
    const url = `${this.baseUrl}/${applicationId}`
    let { jobName, ...neededData } = applicationDetail.data; 
    console.log(applicationDetail);
    return this.http.put(url, { _id: applicationId, _rev: applicationDetail._rev, data: neededData }, { headers: this.headers });
  }
  getParticularJob(jobId: string) {
    const url = `${this.baseUrl}/_design/view/_view/jobdetails_by_id?key="${jobId}"`;
    return this.http.get<any>(url, { headers: this.headers });// job id  returnla name
  }
  // Get the questions from CouchDB
  getMockInterviewQuestions(): Observable<any> {
    const url = `${this.baseUrl}/_design/view/_view/mockinterview_by_id?include_docs=true`;
    return this.http.get(url, { headers: this.headers });
  }
  // Add a question to CouchDB
  addMockInterviewQuestion(questionData: any): Observable<any> {
    const url = `${this.baseUrl}`
    return this.http.post(url, questionData, { headers: this.headers });
  }
  searchForJob(jobName: string): Observable<any> {   
    const url = `${this.baseUrl}/_design/search_index/_search/byjobname?include_docs=true&q=jobname:${jobName}*&wildcart=true`;
    return this.http.get<any>(url, { headers: this.headers });
  }
  // Predict department based on answers
  predictDepartment(answers: string[]): Observable<{ department: string }> {
    return this.http.post<{ department: string }>(this.predictApiUrl, { answers });
  }
  predictscore(answers: string[]): Observable<{ department: string }> {
    return this.http.post<{ department: string }>(this.predictApiUrl, { answers }); 
  }

  currentuser: string = '';
  
  // Register User
  registerUser(data: any): Observable<any> {
    console.log("Registering user...");
    return this.http.post(this.baseUrl, data, { headers: this.headers });
  }
  // section stored
  setLoggedUser(userName: string, userId: string) {
    localStorage.setItem('currentUser', userName);
    localStorage.setItem('currentUserId', userId);
    console.log(localStorage);

  }

  getLoggedInUser(): any {
    const currentUser = localStorage.getItem('currentUser');
    const currentUserId = localStorage.getItem('currentUserId');
    return currentUser;
  }

  getLoggedInUserId(): any {
    const currentUserId = localStorage.getItem('currentUserId');
    return currentUserId;
  }

  // Logout Method - Clear session and remove from localStorage
  logout() {
    localStorage.removeItem('currentUser'); // Clear from localStorage
    console.log('User logged out');


  }
  // Get All Users
  getAllUser(): Observable<any> {
    const url = `${this.baseUrl}/_design/view/_view/register_by_email?include_docs=true`;
    return this.http.get<any>(url, { headers: this.headers });
  }

  // Check if User Exists
  checkUser(email: string): Observable<any> {
    const url = `${this.baseUrl}/_design/view/_view/user_by_email?key="${email}"&include_docs=true`;
    return this.http.get<any>(url, { headers: this.headers });
  }

  // Courses
  addCourses(course: any): Observable<any> {
    return this.http.post(this.baseUrl, course, { headers: this.headers });
  }

  getCourses(): Observable<any> {
    const url = `${this.baseUrl}/_design/view/_view/stream_by_id?include_docs=true`;
    return this.http.get(url, { headers: this.headers });
  }
  // Substreams
  addSubstream(substream: any): Observable<any> {
    return this.http.post(this.baseUrl, substream, { headers: this.headers });
  }

  getsubstream(): Observable<any> {
    const url = `${this.baseUrl}/_design/view/_view/substream_by_streamid?include_docs=true`;
    return this.http.get(url, { headers: this.headers });
  }

  
  
  getcourses(): Observable<any> {
    const url = `${this.baseUrl}/_design/view/_view/stream_by_id`;
    return this.http.get(url, { headers: this.headers });
  }

 
}


