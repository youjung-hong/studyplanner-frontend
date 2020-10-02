import React, { useState, useEffect } from 'react';
import { SubjectInput } from './SubjectInput';
import { SubjectList } from './SubjectList';
import { getSubjects, createSubject, deleteSubject, updateSubject } from '../../utils/SubjectApiUtil';
import { Pagination } from '../Pagination/Pagination';
import { Divider } from 'antd'

function gotoLastPageIfEmpty(totalPages: number) {
  const params = new URLSearchParams(window.location.search);
  params.set('page', `${totalPages}`);
  window.location.search = params.toString();
}


export function SubjectListPage() {
  const [state, setState] = useState({
    isLoading: true,
    subjects: [],
    currentPage: parseInt(new URLSearchParams(window.location.search).get("page") || '1', 10),
    totalPages: 1
  })

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    let pageParam = params.get('page');

    if (!pageParam) {
      params.set('page', '1');
      window.location.search = params.toString();
      return;
    }

    getSubjects(parseInt(pageParam, 10))
      .then((res) => {
        if (res.empty && res.pageable.pageNumber > 0) {
          gotoLastPageIfEmpty(res.totalPages)
          return;
        }

        setState({
          isLoading: false,
          subjects: res.content,
          currentPage: res.pageable.pageNumber + 1,
          totalPages: res.totalPages
        });
      }).catch(res => {
        setState({
          ...state,
          isLoading: false
        })
      })
  }, [])

  return (
    <div className="SubjectListPage">
      <SubjectInput
        onCreate={(data) => {
          setState({
            ...state,
            isLoading: true
          })
          
          return createSubject(data)
            .finally(() => {
              setState({
                ...state,
                isLoading: false
              })
            }).then(() => {
              getSubjects(state.currentPage)
              .then((res) => {
                setState({
                  isLoading: false,
                  subjects: res.content,
                  currentPage: res.pageable.pageNumber + 1,
                  totalPages: res.totalPages
                });
              }).catch(res => {
                setState({
                  ...state,
                  isLoading: false
                })
              })
            })
        }}
      ></SubjectInput>
      <Divider/>
      <SubjectList
        subjects={state.subjects} 
        onDelete={subjectId => {
          setState({
            ...state,
            isLoading: true
          })

          return deleteSubject(subjectId)
            .finally(() => {
              setState({
                ...state,
                isLoading: false
              })
            }).then(() => {
              getSubjects(state.currentPage)
              .then((res) => {
                if (res.empty && res.pageable.pageNumber > 0) {
                  gotoLastPageIfEmpty(res.totalPages)
                  return;
                }

                setState({
                  isLoading: false,
                  subjects: res.content,
                  currentPage: res.pageable.pageNumber + 1,
                  totalPages: res.totalPages
                });
              }).catch(res => {
                setState({
                  ...state,
                  isLoading: false
                })
              })
            })
        }}
        onUpdate={(subject) => {
          setState({
            ...state,
            isLoading: true
          })

          return updateSubject(subject)
            .finally(() => {
              setState({
                ...state,
                isLoading: false
              })
            }).then(() => {
              getSubjects(state.currentPage)
              .then((res) => {
                setState({
                  isLoading: false,
                  subjects: res.content,
                  currentPage: res.pageable.pageNumber + 1,
                  totalPages: res.totalPages
                });
              }).catch(res => {
                setState({
                  ...state,
                  isLoading: false
                })
              })
            })
        }}
      ></SubjectList>
      <Pagination
        currentPage={state.currentPage}
        totalPages={state.totalPages}
        onClickPageNumber={(page) => {
          if (state.isLoading) {
            return;
          }

          const params = new URLSearchParams(window.location.search);
          params.set('page', page + '');
          window.location.search = params.toString()
        }}
      ></Pagination>
    </div>
  );
}
