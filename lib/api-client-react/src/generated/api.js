var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
import {
  useMutation,
  useQuery
} from "@tanstack/react-query";
import { customFetch } from "../custom-fetch";
const withQueryKey = /* @__PURE__ */ __name((query, queryKey) => {
  const result = { queryKey };
  for (const key of Object.keys(query)) {
    if (key === "queryKey") continue;
    Object.defineProperty(result, key, {
      enumerable: true,
      configurable: true,
      get: /* @__PURE__ */ __name(() => query[key], "get")
    });
  }
  return result;
}, "withQueryKey");
const getHealthCheckUrl = /* @__PURE__ */ __name(() => {
  return `/api/healthz`;
}, "getHealthCheckUrl");
const healthCheck = /* @__PURE__ */ __name(async (options) => {
  return customFetch(
    getHealthCheckUrl(),
    {
      ...options,
      method: "GET"
    }
  );
}, "healthCheck");
const getHealthCheckQueryKey = /* @__PURE__ */ __name(() => {
  return [
    `/api/healthz`
  ];
}, "getHealthCheckQueryKey");
const getHealthCheckQueryOptions = /* @__PURE__ */ __name((options) => {
  const { query: queryOptions, request: requestOptions } = options ?? {};
  const queryKey = queryOptions?.queryKey ?? getHealthCheckQueryKey();
  const queryFn = /* @__PURE__ */ __name(({ signal }) => healthCheck({ signal, ...requestOptions }), "queryFn");
  return { queryKey, queryFn, ...queryOptions };
}, "getHealthCheckQueryOptions");
function useHealthCheck(options) {
  const queryOptions = getHealthCheckQueryOptions(options);
  const query = useQuery(queryOptions);
  return withQueryKey(query, queryOptions.queryKey);
}
__name(useHealthCheck, "useHealthCheck");
const getRegisterUrl = /* @__PURE__ */ __name(() => {
  return `/api/auth/register`;
}, "getRegisterUrl");
const register = /* @__PURE__ */ __name(async (registerInput, options) => {
  return customFetch(
    getRegisterUrl(),
    {
      ...options,
      method: "POST",
      headers: { "Content-Type": "application/json", ...options?.headers },
      body: JSON.stringify(registerInput)
    }
  );
}, "register");
const getRegisterMutationOptions = /* @__PURE__ */ __name((options) => {
  const mutationKey = ["register"];
  const { mutation: mutationOptions, request: requestOptions } = options ? options.mutation && "mutationKey" in options.mutation && options.mutation.mutationKey ? options : { ...options, mutation: { ...options.mutation, mutationKey } } : { mutation: { mutationKey }, request: void 0 };
  const mutationFn = /* @__PURE__ */ __name((props) => {
    const { data } = props ?? {};
    return register(data, requestOptions);
  }, "mutationFn");
  return { mutationFn, ...mutationOptions };
}, "getRegisterMutationOptions");
const useRegister = /* @__PURE__ */ __name((options) => {
  return useMutation(getRegisterMutationOptions(options));
}, "useRegister");
const getLoginUrl = /* @__PURE__ */ __name(() => {
  return `/api/auth/login`;
}, "getLoginUrl");
const login = /* @__PURE__ */ __name(async (loginInput, options) => {
  return customFetch(
    getLoginUrl(),
    {
      ...options,
      method: "POST",
      headers: { "Content-Type": "application/json", ...options?.headers },
      body: JSON.stringify(loginInput)
    }
  );
}, "login");
const getLoginMutationOptions = /* @__PURE__ */ __name((options) => {
  const mutationKey = ["login"];
  const { mutation: mutationOptions, request: requestOptions } = options ? options.mutation && "mutationKey" in options.mutation && options.mutation.mutationKey ? options : { ...options, mutation: { ...options.mutation, mutationKey } } : { mutation: { mutationKey }, request: void 0 };
  const mutationFn = /* @__PURE__ */ __name((props) => {
    const { data } = props ?? {};
    return login(data, requestOptions);
  }, "mutationFn");
  return { mutationFn, ...mutationOptions };
}, "getLoginMutationOptions");
const useLogin = /* @__PURE__ */ __name((options) => {
  return useMutation(getLoginMutationOptions(options));
}, "useLogin");
const getGetMeUrl = /* @__PURE__ */ __name(() => {
  return `/api/auth/me`;
}, "getGetMeUrl");
const getMe = /* @__PURE__ */ __name(async (options) => {
  return customFetch(
    getGetMeUrl(),
    {
      ...options,
      method: "GET"
    }
  );
}, "getMe");
const getGetMeQueryKey = /* @__PURE__ */ __name(() => {
  return [
    `/api/auth/me`
  ];
}, "getGetMeQueryKey");
const getGetMeQueryOptions = /* @__PURE__ */ __name((options) => {
  const { query: queryOptions, request: requestOptions } = options ?? {};
  const queryKey = queryOptions?.queryKey ?? getGetMeQueryKey();
  const queryFn = /* @__PURE__ */ __name(({ signal }) => getMe({ signal, ...requestOptions }), "queryFn");
  return { queryKey, queryFn, ...queryOptions };
}, "getGetMeQueryOptions");
function useGetMe(options) {
  const queryOptions = getGetMeQueryOptions(options);
  const query = useQuery(queryOptions);
  return withQueryKey(query, queryOptions.queryKey);
}
__name(useGetMe, "useGetMe");
const getGetMyClassroomsUrl = /* @__PURE__ */ __name(() => {
  return `/api/classrooms`;
}, "getGetMyClassroomsUrl");
const getMyClassrooms = /* @__PURE__ */ __name(async (options) => {
  return customFetch(
    getGetMyClassroomsUrl(),
    {
      ...options,
      method: "GET"
    }
  );
}, "getMyClassrooms");
const getGetMyClassroomsQueryKey = /* @__PURE__ */ __name(() => {
  return [
    `/api/classrooms`
  ];
}, "getGetMyClassroomsQueryKey");
const getGetMyClassroomsQueryOptions = /* @__PURE__ */ __name((options) => {
  const { query: queryOptions, request: requestOptions } = options ?? {};
  const queryKey = queryOptions?.queryKey ?? getGetMyClassroomsQueryKey();
  const queryFn = /* @__PURE__ */ __name(({ signal }) => getMyClassrooms({ signal, ...requestOptions }), "queryFn");
  return { queryKey, queryFn, ...queryOptions };
}, "getGetMyClassroomsQueryOptions");
function useGetMyClassrooms(options) {
  const queryOptions = getGetMyClassroomsQueryOptions(options);
  const query = useQuery(queryOptions);
  return withQueryKey(query, queryOptions.queryKey);
}
__name(useGetMyClassrooms, "useGetMyClassrooms");
const getCreateClassroomUrl = /* @__PURE__ */ __name(() => {
  return `/api/classrooms`;
}, "getCreateClassroomUrl");
const createClassroom = /* @__PURE__ */ __name(async (classroomInput, options) => {
  return customFetch(
    getCreateClassroomUrl(),
    {
      ...options,
      method: "POST",
      headers: { "Content-Type": "application/json", ...options?.headers },
      body: JSON.stringify(classroomInput)
    }
  );
}, "createClassroom");
const getCreateClassroomMutationOptions = /* @__PURE__ */ __name((options) => {
  const mutationKey = ["createClassroom"];
  const { mutation: mutationOptions, request: requestOptions } = options ? options.mutation && "mutationKey" in options.mutation && options.mutation.mutationKey ? options : { ...options, mutation: { ...options.mutation, mutationKey } } : { mutation: { mutationKey }, request: void 0 };
  const mutationFn = /* @__PURE__ */ __name((props) => {
    const { data } = props ?? {};
    return createClassroom(data, requestOptions);
  }, "mutationFn");
  return { mutationFn, ...mutationOptions };
}, "getCreateClassroomMutationOptions");
const useCreateClassroom = /* @__PURE__ */ __name((options) => {
  return useMutation(getCreateClassroomMutationOptions(options));
}, "useCreateClassroom");
const getJoinClassroomUrl = /* @__PURE__ */ __name(() => {
  return `/api/classrooms/join`;
}, "getJoinClassroomUrl");
const joinClassroom = /* @__PURE__ */ __name(async (joinClassroomInput, options) => {
  return customFetch(
    getJoinClassroomUrl(),
    {
      ...options,
      method: "POST",
      headers: { "Content-Type": "application/json", ...options?.headers },
      body: JSON.stringify(joinClassroomInput)
    }
  );
}, "joinClassroom");
const getJoinClassroomMutationOptions = /* @__PURE__ */ __name((options) => {
  const mutationKey = ["joinClassroom"];
  const { mutation: mutationOptions, request: requestOptions } = options ? options.mutation && "mutationKey" in options.mutation && options.mutation.mutationKey ? options : { ...options, mutation: { ...options.mutation, mutationKey } } : { mutation: { mutationKey }, request: void 0 };
  const mutationFn = /* @__PURE__ */ __name((props) => {
    const { data } = props ?? {};
    return joinClassroom(data, requestOptions);
  }, "mutationFn");
  return { mutationFn, ...mutationOptions };
}, "getJoinClassroomMutationOptions");
const useJoinClassroom = /* @__PURE__ */ __name((options) => {
  return useMutation(getJoinClassroomMutationOptions(options));
}, "useJoinClassroom");
const getGetClassroomUrl = /* @__PURE__ */ __name((classroomId) => {
  return `/api/classrooms/${classroomId}`;
}, "getGetClassroomUrl");
const getClassroom = /* @__PURE__ */ __name(async (classroomId, options) => {
  return customFetch(
    getGetClassroomUrl(classroomId),
    {
      ...options,
      method: "GET"
    }
  );
}, "getClassroom");
const getGetClassroomQueryKey = /* @__PURE__ */ __name((classroomId) => {
  return [
    `/api/classrooms/${classroomId}`
  ];
}, "getGetClassroomQueryKey");
const getGetClassroomQueryOptions = /* @__PURE__ */ __name((classroomId, options) => {
  const { query: queryOptions, request: requestOptions } = options ?? {};
  const queryKey = queryOptions?.queryKey ?? getGetClassroomQueryKey(classroomId);
  const queryFn = /* @__PURE__ */ __name(({ signal }) => getClassroom(classroomId, { signal, ...requestOptions }), "queryFn");
  return { queryKey, queryFn, enabled: classroomId !== null && classroomId !== void 0, ...queryOptions };
}, "getGetClassroomQueryOptions");
function useGetClassroom(classroomId, options) {
  const queryOptions = getGetClassroomQueryOptions(classroomId, options);
  const query = useQuery(queryOptions);
  return withQueryKey(query, queryOptions.queryKey);
}
__name(useGetClassroom, "useGetClassroom");
const getUpdateClassroomUrl = /* @__PURE__ */ __name((classroomId) => {
  return `/api/classrooms/${classroomId}`;
}, "getUpdateClassroomUrl");
const updateClassroom = /* @__PURE__ */ __name(async (classroomId, classroomUpdate, options) => {
  return customFetch(
    getUpdateClassroomUrl(classroomId),
    {
      ...options,
      method: "PATCH",
      headers: { "Content-Type": "application/json", ...options?.headers },
      body: JSON.stringify(classroomUpdate)
    }
  );
}, "updateClassroom");
const getUpdateClassroomMutationOptions = /* @__PURE__ */ __name((options) => {
  const mutationKey = ["updateClassroom"];
  const { mutation: mutationOptions, request: requestOptions } = options ? options.mutation && "mutationKey" in options.mutation && options.mutation.mutationKey ? options : { ...options, mutation: { ...options.mutation, mutationKey } } : { mutation: { mutationKey }, request: void 0 };
  const mutationFn = /* @__PURE__ */ __name((props) => {
    const { classroomId, data } = props ?? {};
    return updateClassroom(classroomId, data, requestOptions);
  }, "mutationFn");
  return { mutationFn, ...mutationOptions };
}, "getUpdateClassroomMutationOptions");
const useUpdateClassroom = /* @__PURE__ */ __name((options) => {
  return useMutation(getUpdateClassroomMutationOptions(options));
}, "useUpdateClassroom");
const getGetClassroomMembersUrl = /* @__PURE__ */ __name((classroomId) => {
  return `/api/classrooms/${classroomId}/members`;
}, "getGetClassroomMembersUrl");
const getClassroomMembers = /* @__PURE__ */ __name(async (classroomId, options) => {
  return customFetch(
    getGetClassroomMembersUrl(classroomId),
    {
      ...options,
      method: "GET"
    }
  );
}, "getClassroomMembers");
const getGetClassroomMembersQueryKey = /* @__PURE__ */ __name((classroomId) => {
  return [
    `/api/classrooms/${classroomId}/members`
  ];
}, "getGetClassroomMembersQueryKey");
const getGetClassroomMembersQueryOptions = /* @__PURE__ */ __name((classroomId, options) => {
  const { query: queryOptions, request: requestOptions } = options ?? {};
  const queryKey = queryOptions?.queryKey ?? getGetClassroomMembersQueryKey(classroomId);
  const queryFn = /* @__PURE__ */ __name(({ signal }) => getClassroomMembers(classroomId, { signal, ...requestOptions }), "queryFn");
  return { queryKey, queryFn, enabled: classroomId !== null && classroomId !== void 0, ...queryOptions };
}, "getGetClassroomMembersQueryOptions");
function useGetClassroomMembers(classroomId, options) {
  const queryOptions = getGetClassroomMembersQueryOptions(classroomId, options);
  const query = useQuery(queryOptions);
  return withQueryKey(query, queryOptions.queryKey);
}
__name(useGetClassroomMembers, "useGetClassroomMembers");
const getRemoveMemberUrl = /* @__PURE__ */ __name((classroomId, memberId) => {
  return `/api/classrooms/${classroomId}/members/${memberId}`;
}, "getRemoveMemberUrl");
const removeMember = /* @__PURE__ */ __name(async (classroomId, memberId, options) => {
  return customFetch(
    getRemoveMemberUrl(classroomId, memberId),
    {
      ...options,
      method: "DELETE"
    }
  );
}, "removeMember");
const getRemoveMemberMutationOptions = /* @__PURE__ */ __name((options) => {
  const mutationKey = ["removeMember"];
  const { mutation: mutationOptions, request: requestOptions } = options ? options.mutation && "mutationKey" in options.mutation && options.mutation.mutationKey ? options : { ...options, mutation: { ...options.mutation, mutationKey } } : { mutation: { mutationKey }, request: void 0 };
  const mutationFn = /* @__PURE__ */ __name((props) => {
    const { classroomId, memberId } = props ?? {};
    return removeMember(classroomId, memberId, requestOptions);
  }, "mutationFn");
  return { mutationFn, ...mutationOptions };
}, "getRemoveMemberMutationOptions");
const useRemoveMember = /* @__PURE__ */ __name((options) => {
  return useMutation(getRemoveMemberMutationOptions(options));
}, "useRemoveMember");
const getGetClassroomStatsUrl = /* @__PURE__ */ __name((classroomId) => {
  return `/api/classrooms/${classroomId}/stats`;
}, "getGetClassroomStatsUrl");
const getClassroomStats = /* @__PURE__ */ __name(async (classroomId, options) => {
  return customFetch(
    getGetClassroomStatsUrl(classroomId),
    {
      ...options,
      method: "GET"
    }
  );
}, "getClassroomStats");
const getGetClassroomStatsQueryKey = /* @__PURE__ */ __name((classroomId) => {
  return [
    `/api/classrooms/${classroomId}/stats`
  ];
}, "getGetClassroomStatsQueryKey");
const getGetClassroomStatsQueryOptions = /* @__PURE__ */ __name((classroomId, options) => {
  const { query: queryOptions, request: requestOptions } = options ?? {};
  const queryKey = queryOptions?.queryKey ?? getGetClassroomStatsQueryKey(classroomId);
  const queryFn = /* @__PURE__ */ __name(({ signal }) => getClassroomStats(classroomId, { signal, ...requestOptions }), "queryFn");
  return { queryKey, queryFn, enabled: classroomId !== null && classroomId !== void 0, ...queryOptions };
}, "getGetClassroomStatsQueryOptions");
function useGetClassroomStats(classroomId, options) {
  const queryOptions = getGetClassroomStatsQueryOptions(classroomId, options);
  const query = useQuery(queryOptions);
  return withQueryKey(query, queryOptions.queryKey);
}
__name(useGetClassroomStats, "useGetClassroomStats");
const getGetClassroomResourcesUrl = /* @__PURE__ */ __name((classroomId) => {
  return `/api/classrooms/${classroomId}/resources`;
}, "getGetClassroomResourcesUrl");
const getClassroomResources = /* @__PURE__ */ __name(async (classroomId, options) => {
  return customFetch(
    getGetClassroomResourcesUrl(classroomId),
    {
      ...options,
      method: "GET"
    }
  );
}, "getClassroomResources");
const getGetClassroomResourcesQueryKey = /* @__PURE__ */ __name((classroomId) => {
  return [
    `/api/classrooms/${classroomId}/resources`
  ];
}, "getGetClassroomResourcesQueryKey");
const getGetClassroomResourcesQueryOptions = /* @__PURE__ */ __name((classroomId, options) => {
  const { query: queryOptions, request: requestOptions } = options ?? {};
  const queryKey = queryOptions?.queryKey ?? getGetClassroomResourcesQueryKey(classroomId);
  const queryFn = /* @__PURE__ */ __name(({ signal }) => getClassroomResources(classroomId, { signal, ...requestOptions }), "queryFn");
  return { queryKey, queryFn, enabled: classroomId !== null && classroomId !== void 0, ...queryOptions };
}, "getGetClassroomResourcesQueryOptions");
function useGetClassroomResources(classroomId, options) {
  const queryOptions = getGetClassroomResourcesQueryOptions(classroomId, options);
  const query = useQuery(queryOptions);
  return withQueryKey(query, queryOptions.queryKey);
}
__name(useGetClassroomResources, "useGetClassroomResources");
const getUploadResourceUrl = /* @__PURE__ */ __name((classroomId) => {
  return `/api/classrooms/${classroomId}/resources`;
}, "getUploadResourceUrl");
const uploadResource = /* @__PURE__ */ __name(async (classroomId, resourceInput, options) => {
  return customFetch(
    getUploadResourceUrl(classroomId),
    {
      ...options,
      method: "POST",
      headers: { "Content-Type": "application/json", ...options?.headers },
      body: JSON.stringify(resourceInput)
    }
  );
}, "uploadResource");
const getUploadResourceMutationOptions = /* @__PURE__ */ __name((options) => {
  const mutationKey = ["uploadResource"];
  const { mutation: mutationOptions, request: requestOptions } = options ? options.mutation && "mutationKey" in options.mutation && options.mutation.mutationKey ? options : { ...options, mutation: { ...options.mutation, mutationKey } } : { mutation: { mutationKey }, request: void 0 };
  const mutationFn = /* @__PURE__ */ __name((props) => {
    const { classroomId, data } = props ?? {};
    return uploadResource(classroomId, data, requestOptions);
  }, "mutationFn");
  return { mutationFn, ...mutationOptions };
}, "getUploadResourceMutationOptions");
const useUploadResource = /* @__PURE__ */ __name((options) => {
  return useMutation(getUploadResourceMutationOptions(options));
}, "useUploadResource");
const getGetPendingResourcesUrl = /* @__PURE__ */ __name((classroomId) => {
  return `/api/classrooms/${classroomId}/resources/pending`;
}, "getGetPendingResourcesUrl");
const getPendingResources = /* @__PURE__ */ __name(async (classroomId, options) => {
  return customFetch(
    getGetPendingResourcesUrl(classroomId),
    {
      ...options,
      method: "GET"
    }
  );
}, "getPendingResources");
const getGetPendingResourcesQueryKey = /* @__PURE__ */ __name((classroomId) => {
  return [
    `/api/classrooms/${classroomId}/resources/pending`
  ];
}, "getGetPendingResourcesQueryKey");
const getGetPendingResourcesQueryOptions = /* @__PURE__ */ __name((classroomId, options) => {
  const { query: queryOptions, request: requestOptions } = options ?? {};
  const queryKey = queryOptions?.queryKey ?? getGetPendingResourcesQueryKey(classroomId);
  const queryFn = /* @__PURE__ */ __name(({ signal }) => getPendingResources(classroomId, { signal, ...requestOptions }), "queryFn");
  return { queryKey, queryFn, enabled: classroomId !== null && classroomId !== void 0, ...queryOptions };
}, "getGetPendingResourcesQueryOptions");
function useGetPendingResources(classroomId, options) {
  const queryOptions = getGetPendingResourcesQueryOptions(classroomId, options);
  const query = useQuery(queryOptions);
  return withQueryKey(query, queryOptions.queryKey);
}
__name(useGetPendingResources, "useGetPendingResources");
const getApproveResourceUrl = /* @__PURE__ */ __name((classroomId, resourceId) => {
  return `/api/classrooms/${classroomId}/resources/${resourceId}/approve`;
}, "getApproveResourceUrl");
const approveResource = /* @__PURE__ */ __name(async (classroomId, resourceId, options) => {
  return customFetch(
    getApproveResourceUrl(classroomId, resourceId),
    {
      ...options,
      method: "POST"
    }
  );
}, "approveResource");
const getApproveResourceMutationOptions = /* @__PURE__ */ __name((options) => {
  const mutationKey = ["approveResource"];
  const { mutation: mutationOptions, request: requestOptions } = options ? options.mutation && "mutationKey" in options.mutation && options.mutation.mutationKey ? options : { ...options, mutation: { ...options.mutation, mutationKey } } : { mutation: { mutationKey }, request: void 0 };
  const mutationFn = /* @__PURE__ */ __name((props) => {
    const { classroomId, resourceId } = props ?? {};
    return approveResource(classroomId, resourceId, requestOptions);
  }, "mutationFn");
  return { mutationFn, ...mutationOptions };
}, "getApproveResourceMutationOptions");
const useApproveResource = /* @__PURE__ */ __name((options) => {
  return useMutation(getApproveResourceMutationOptions(options));
}, "useApproveResource");
const getRejectResourceUrl = /* @__PURE__ */ __name((classroomId, resourceId) => {
  return `/api/classrooms/${classroomId}/resources/${resourceId}/reject`;
}, "getRejectResourceUrl");
const rejectResource = /* @__PURE__ */ __name(async (classroomId, resourceId, rejectionInput, options) => {
  return customFetch(
    getRejectResourceUrl(classroomId, resourceId),
    {
      ...options,
      method: "POST",
      headers: { "Content-Type": "application/json", ...options?.headers },
      body: JSON.stringify(rejectionInput)
    }
  );
}, "rejectResource");
const getRejectResourceMutationOptions = /* @__PURE__ */ __name((options) => {
  const mutationKey = ["rejectResource"];
  const { mutation: mutationOptions, request: requestOptions } = options ? options.mutation && "mutationKey" in options.mutation && options.mutation.mutationKey ? options : { ...options, mutation: { ...options.mutation, mutationKey } } : { mutation: { mutationKey }, request: void 0 };
  const mutationFn = /* @__PURE__ */ __name((props) => {
    const { classroomId, resourceId, data } = props ?? {};
    return rejectResource(classroomId, resourceId, data, requestOptions);
  }, "mutationFn");
  return { mutationFn, ...mutationOptions };
}, "getRejectResourceMutationOptions");
const useRejectResource = /* @__PURE__ */ __name((options) => {
  return useMutation(getRejectResourceMutationOptions(options));
}, "useRejectResource");
const getDownloadResourceUrl = /* @__PURE__ */ __name((classroomId, resourceId) => {
  return `/api/classrooms/${classroomId}/resources/${resourceId}/download`;
}, "getDownloadResourceUrl");
const downloadResource = /* @__PURE__ */ __name(async (classroomId, resourceId, options) => {
  return customFetch(
    getDownloadResourceUrl(classroomId, resourceId),
    {
      ...options,
      method: "POST"
    }
  );
}, "downloadResource");
const getDownloadResourceMutationOptions = /* @__PURE__ */ __name((options) => {
  const mutationKey = ["downloadResource"];
  const { mutation: mutationOptions, request: requestOptions } = options ? options.mutation && "mutationKey" in options.mutation && options.mutation.mutationKey ? options : { ...options, mutation: { ...options.mutation, mutationKey } } : { mutation: { mutationKey }, request: void 0 };
  const mutationFn = /* @__PURE__ */ __name((props) => {
    const { classroomId, resourceId } = props ?? {};
    return downloadResource(classroomId, resourceId, requestOptions);
  }, "mutationFn");
  return { mutationFn, ...mutationOptions };
}, "getDownloadResourceMutationOptions");
const useDownloadResource = /* @__PURE__ */ __name((options) => {
  return useMutation(getDownloadResourceMutationOptions(options));
}, "useDownloadResource");
const getGetTokenHistoryUrl = /* @__PURE__ */ __name(() => {
  return `/api/tokens/history`;
}, "getGetTokenHistoryUrl");
const getTokenHistory = /* @__PURE__ */ __name(async (options) => {
  return customFetch(
    getGetTokenHistoryUrl(),
    {
      ...options,
      method: "GET"
    }
  );
}, "getTokenHistory");
const getGetTokenHistoryQueryKey = /* @__PURE__ */ __name(() => {
  return [
    `/api/tokens/history`
  ];
}, "getGetTokenHistoryQueryKey");
const getGetTokenHistoryQueryOptions = /* @__PURE__ */ __name((options) => {
  const { query: queryOptions, request: requestOptions } = options ?? {};
  const queryKey = queryOptions?.queryKey ?? getGetTokenHistoryQueryKey();
  const queryFn = /* @__PURE__ */ __name(({ signal }) => getTokenHistory({ signal, ...requestOptions }), "queryFn");
  return { queryKey, queryFn, ...queryOptions };
}, "getGetTokenHistoryQueryOptions");
function useGetTokenHistory(options) {
  const queryOptions = getGetTokenHistoryQueryOptions(options);
  const query = useQuery(queryOptions);
  return withQueryKey(query, queryOptions.queryKey);
}
__name(useGetTokenHistory, "useGetTokenHistory");
const getGetNotificationsUrl = /* @__PURE__ */ __name(() => {
  return `/api/notifications`;
}, "getGetNotificationsUrl");
const getNotifications = /* @__PURE__ */ __name(async (options) => {
  return customFetch(
    getGetNotificationsUrl(),
    {
      ...options,
      method: "GET"
    }
  );
}, "getNotifications");
const getGetNotificationsQueryKey = /* @__PURE__ */ __name(() => {
  return [
    `/api/notifications`
  ];
}, "getGetNotificationsQueryKey");
const getGetNotificationsQueryOptions = /* @__PURE__ */ __name((options) => {
  const { query: queryOptions, request: requestOptions } = options ?? {};
  const queryKey = queryOptions?.queryKey ?? getGetNotificationsQueryKey();
  const queryFn = /* @__PURE__ */ __name(({ signal }) => getNotifications({ signal, ...requestOptions }), "queryFn");
  return { queryKey, queryFn, ...queryOptions };
}, "getGetNotificationsQueryOptions");
function useGetNotifications(options) {
  const queryOptions = getGetNotificationsQueryOptions(options);
  const query = useQuery(queryOptions);
  return withQueryKey(query, queryOptions.queryKey);
}
__name(useGetNotifications, "useGetNotifications");
const getMarkAllNotificationsReadUrl = /* @__PURE__ */ __name(() => {
  return `/api/notifications/read-all`;
}, "getMarkAllNotificationsReadUrl");
const markAllNotificationsRead = /* @__PURE__ */ __name(async (options) => {
  return customFetch(
    getMarkAllNotificationsReadUrl(),
    {
      ...options,
      method: "POST"
    }
  );
}, "markAllNotificationsRead");
const getMarkAllNotificationsReadMutationOptions = /* @__PURE__ */ __name((options) => {
  const mutationKey = ["markAllNotificationsRead"];
  const { mutation: mutationOptions, request: requestOptions } = options ? options.mutation && "mutationKey" in options.mutation && options.mutation.mutationKey ? options : { ...options, mutation: { ...options.mutation, mutationKey } } : { mutation: { mutationKey }, request: void 0 };
  const mutationFn = /* @__PURE__ */ __name(() => {
    return markAllNotificationsRead(requestOptions);
  }, "mutationFn");
  return { mutationFn, ...mutationOptions };
}, "getMarkAllNotificationsReadMutationOptions");
const useMarkAllNotificationsRead = /* @__PURE__ */ __name((options) => {
  return useMutation(getMarkAllNotificationsReadMutationOptions(options));
}, "useMarkAllNotificationsRead");
const getMarkNotificationReadUrl = /* @__PURE__ */ __name((notificationId) => {
  return `/api/notifications/${notificationId}/read`;
}, "getMarkNotificationReadUrl");
const markNotificationRead = /* @__PURE__ */ __name(async (notificationId, options) => {
  return customFetch(
    getMarkNotificationReadUrl(notificationId),
    {
      ...options,
      method: "POST"
    }
  );
}, "markNotificationRead");
const getMarkNotificationReadMutationOptions = /* @__PURE__ */ __name((options) => {
  const mutationKey = ["markNotificationRead"];
  const { mutation: mutationOptions, request: requestOptions } = options ? options.mutation && "mutationKey" in options.mutation && options.mutation.mutationKey ? options : { ...options, mutation: { ...options.mutation, mutationKey } } : { mutation: { mutationKey }, request: void 0 };
  const mutationFn = /* @__PURE__ */ __name((props) => {
    const { notificationId } = props ?? {};
    return markNotificationRead(notificationId, requestOptions);
  }, "mutationFn");
  return { mutationFn, ...mutationOptions };
}, "getMarkNotificationReadMutationOptions");
const useMarkNotificationRead = /* @__PURE__ */ __name((options) => {
  return useMutation(getMarkNotificationReadMutationOptions(options));
}, "useMarkNotificationRead");
const getGetUploadSignatureUrl = /* @__PURE__ */ __name(() => {
  return `/api/upload/sign`;
}, "getGetUploadSignatureUrl");
const getUploadSignature = /* @__PURE__ */ __name(async (options) => {
  return customFetch(
    getGetUploadSignatureUrl(),
    {
      ...options,
      method: "POST"
    }
  );
}, "getUploadSignature");
const getGetUploadSignatureMutationOptions = /* @__PURE__ */ __name((options) => {
  const mutationKey = ["getUploadSignature"];
  const { mutation: mutationOptions, request: requestOptions } = options ? options.mutation && "mutationKey" in options.mutation && options.mutation.mutationKey ? options : { ...options, mutation: { ...options.mutation, mutationKey } } : { mutation: { mutationKey }, request: void 0 };
  const mutationFn = /* @__PURE__ */ __name(() => {
    return getUploadSignature(requestOptions);
  }, "mutationFn");
  return { mutationFn, ...mutationOptions };
}, "getGetUploadSignatureMutationOptions");
const useGetUploadSignature = /* @__PURE__ */ __name((options) => {
  return useMutation(getGetUploadSignatureMutationOptions(options));
}, "useGetUploadSignature");
const getGetDashboardSummaryUrl = /* @__PURE__ */ __name(() => {
  return `/api/dashboard/summary`;
}, "getGetDashboardSummaryUrl");
const getDashboardSummary = /* @__PURE__ */ __name(async (options) => {
  return customFetch(
    getGetDashboardSummaryUrl(),
    {
      ...options,
      method: "GET"
    }
  );
}, "getDashboardSummary");
const getGetDashboardSummaryQueryKey = /* @__PURE__ */ __name(() => {
  return [
    `/api/dashboard/summary`
  ];
}, "getGetDashboardSummaryQueryKey");
const getGetDashboardSummaryQueryOptions = /* @__PURE__ */ __name((options) => {
  const { query: queryOptions, request: requestOptions } = options ?? {};
  const queryKey = queryOptions?.queryKey ?? getGetDashboardSummaryQueryKey();
  const queryFn = /* @__PURE__ */ __name(({ signal }) => getDashboardSummary({ signal, ...requestOptions }), "queryFn");
  return { queryKey, queryFn, ...queryOptions };
}, "getGetDashboardSummaryQueryOptions");
function useGetDashboardSummary(options) {
  const queryOptions = getGetDashboardSummaryQueryOptions(options);
  const query = useQuery(queryOptions);
  return withQueryKey(query, queryOptions.queryKey);
}
__name(useGetDashboardSummary, "useGetDashboardSummary");
export {
  approveResource,
  createClassroom,
  downloadResource,
  getApproveResourceMutationOptions,
  getApproveResourceUrl,
  getClassroom,
  getClassroomMembers,
  getClassroomResources,
  getClassroomStats,
  getCreateClassroomMutationOptions,
  getCreateClassroomUrl,
  getDashboardSummary,
  getDownloadResourceMutationOptions,
  getDownloadResourceUrl,
  getGetClassroomMembersQueryKey,
  getGetClassroomMembersQueryOptions,
  getGetClassroomMembersUrl,
  getGetClassroomQueryKey,
  getGetClassroomQueryOptions,
  getGetClassroomResourcesQueryKey,
  getGetClassroomResourcesQueryOptions,
  getGetClassroomResourcesUrl,
  getGetClassroomStatsQueryKey,
  getGetClassroomStatsQueryOptions,
  getGetClassroomStatsUrl,
  getGetClassroomUrl,
  getGetDashboardSummaryQueryKey,
  getGetDashboardSummaryQueryOptions,
  getGetDashboardSummaryUrl,
  getGetMeQueryKey,
  getGetMeQueryOptions,
  getGetMeUrl,
  getGetMyClassroomsQueryKey,
  getGetMyClassroomsQueryOptions,
  getGetMyClassroomsUrl,
  getGetNotificationsQueryKey,
  getGetNotificationsQueryOptions,
  getGetNotificationsUrl,
  getGetPendingResourcesQueryKey,
  getGetPendingResourcesQueryOptions,
  getGetPendingResourcesUrl,
  getGetTokenHistoryQueryKey,
  getGetTokenHistoryQueryOptions,
  getGetTokenHistoryUrl,
  getGetUploadSignatureMutationOptions,
  getGetUploadSignatureUrl,
  getHealthCheckQueryKey,
  getHealthCheckQueryOptions,
  getHealthCheckUrl,
  getJoinClassroomMutationOptions,
  getJoinClassroomUrl,
  getLoginMutationOptions,
  getLoginUrl,
  getMarkAllNotificationsReadMutationOptions,
  getMarkAllNotificationsReadUrl,
  getMarkNotificationReadMutationOptions,
  getMarkNotificationReadUrl,
  getMe,
  getMyClassrooms,
  getNotifications,
  getPendingResources,
  getRegisterMutationOptions,
  getRegisterUrl,
  getRejectResourceMutationOptions,
  getRejectResourceUrl,
  getRemoveMemberMutationOptions,
  getRemoveMemberUrl,
  getTokenHistory,
  getUpdateClassroomMutationOptions,
  getUpdateClassroomUrl,
  getUploadResourceMutationOptions,
  getUploadResourceUrl,
  getUploadSignature,
  healthCheck,
  joinClassroom,
  login,
  markAllNotificationsRead,
  markNotificationRead,
  register,
  rejectResource,
  removeMember,
  updateClassroom,
  uploadResource,
  useApproveResource,
  useCreateClassroom,
  useDownloadResource,
  useGetClassroom,
  useGetClassroomMembers,
  useGetClassroomResources,
  useGetClassroomStats,
  useGetDashboardSummary,
  useGetMe,
  useGetMyClassrooms,
  useGetNotifications,
  useGetPendingResources,
  useGetTokenHistory,
  useGetUploadSignature,
  useHealthCheck,
  useJoinClassroom,
  useLogin,
  useMarkAllNotificationsRead,
  useMarkNotificationRead,
  useRegister,
  useRejectResource,
  useRemoveMember,
  useUpdateClassroom,
  useUploadResource
};
