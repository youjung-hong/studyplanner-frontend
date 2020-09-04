import React, { useState, useEffect } from 'react';
import { SubjectInput } from './SubjectInput';
import { SubjectList } from './SubjectList';
import { getSubjects, createSubject, deleteSubject, updateSubject } from '../../utils/SubjectApiUtil';
import { Pagination } from '../Pagination/Pagination';

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
      pageParam = '1'
      const search = window.location.search;
      window.location.search += `${search[0] === '?' ? '&' : '?'}page=${pageParam}`
    }

    getSubjects(parseInt(pageParam, 10))
      .then((res) => {
        setState({
          isLoading: false,
          subjects: res.content,
          currentPage: res.pageable.pageNumber === 0 ? 1 : res.pageable.pageNumber,
          totalPages: res.totalPages
        });
      }).catch(res => {
        setState({
          ...state,
          isLoading: false
        })
      })
  }, [])

  useEffect(() => {
    console.log('useEffect', state)
  })

  return (
    <div>
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
                  currentPage: res.pageable.pageNumber === 0 ? 1 : res.pageable.pageNumber,
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
                setState({
                  isLoading: false,
                  subjects: res.content,
                  currentPage: res.pageable.pageNumber === 0 ? 1 : res.pageable.pageNumber,
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
                  currentPage: res.pageable.pageNumber === 0 ? 1 : res.pageable.pageNumber,
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

          const search = window.location.search;
          window.location.search += `${search[0] === '?' ? '&' : '?'}page=${page}`
          setState({
            ...state,
            isLoading: true,
            currentPage: page
          })

          getSubjects(page)
          .then((res) => {
            setState({
              isLoading: false,
              subjects: res.content,
              currentPage: res.pageable.pageNumber === 0 ? 1 : res.pageable.pageNumber,
              totalPages: res.totalPages
            });
          }).catch(res => {
            setState({
              ...state,
              isLoading: false
            })
          })
        }}
      ></Pagination>
    </div>
  );
}
