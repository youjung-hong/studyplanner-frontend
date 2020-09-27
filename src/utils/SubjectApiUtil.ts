import ApiUtil from "./ApiUtil";
import { Subject } from "../models/Subject";

export function getSubjects(page: number = 1) {
  return ApiUtil.get(`/subjects?page=${page}`);
}

export function createSubject(data: { title: string }) {
  return ApiUtil.post(`/subjects`, data.title);
}

export function updateSubject(subject: Subject) {
  return ApiUtil.put(`/subjects/${subject.id}`, subject);
}

export function deleteSubject(subjectId: number) {
  return ApiUtil.delete(`/subjects/${subjectId}`);
}