import axios from 'axios';

const apiClient = axios.create({
    baseURL: 'http://localhost:3000/api',
    headers: {
        Authorization: 'b0301d3ae7377cda358c533f53ab4d52db6e368ec7e596e16120984b59c1d169'
    }
});

export default {
    getStudents() {
        return apiClient.get('/student/list');
    },
    deleteStudent(id) {
        return apiClient.delete(`/student/delete/${id}`);
    },
    updateStudent(id, studentData) {
        return apiClient.put(`/student/update/${id}`, studentData);
    },
    createStudent(studentData) {
        return apiClient.post('/student/create', studentData);
    },
    getStudentsCourses() {
        return apiClient.get('/student/courses/list');
    },
    getStudentsCoursesProgress() {
        return apiClient.get('/student/courses/progress');
    },
};
