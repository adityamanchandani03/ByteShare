import * as zod from "zod";
const HealthCheckResponse = zod.object({
  "status": zod.string()
});
const registerBodyNameMin = 2;
const registerBodyPasswordMin = 6;
const RegisterBody = zod.object({
  "name": zod.string().min(registerBodyNameMin),
  "email": zod.string().email(),
  "password": zod.string().min(registerBodyPasswordMin)
});
const RegisterResponse = zod.object({
  "token": zod.string(),
  "user": zod.object({
    "id": zod.string(),
    "name": zod.string(),
    "email": zod.string(),
    "tokenBalance": zod.number(),
    "reputation": zod.number(),
    "createdAt": zod.coerce.date().optional()
  })
});
const LoginBody = zod.object({
  "email": zod.string().email(),
  "password": zod.string()
});
const LoginResponse = zod.object({
  "token": zod.string(),
  "user": zod.object({
    "id": zod.string(),
    "name": zod.string(),
    "email": zod.string(),
    "tokenBalance": zod.number(),
    "reputation": zod.number(),
    "createdAt": zod.coerce.date().optional()
  })
});
const GetMeResponse = zod.object({
  "id": zod.string(),
  "name": zod.string(),
  "email": zod.string(),
  "tokenBalance": zod.number(),
  "reputation": zod.number(),
  "createdAt": zod.coerce.date().optional()
});
const GetMyClassroomsResponseItem = zod.object({
  "id": zod.string(),
  "name": zod.string(),
  "subject": zod.string(),
  "department": zod.string(),
  "semester": zod.string(),
  "description": zod.string().nullish(),
  "inviteCode": zod.string(),
  "hostId": zod.string(),
  "hostName": zod.string().optional(),
  "memberCount": zod.number(),
  "isHost": zod.boolean().optional(),
  "createdAt": zod.coerce.date().optional()
});
const GetMyClassroomsResponse = zod.array(GetMyClassroomsResponseItem);
const createClassroomBodyNameMin = 3;
const CreateClassroomBody = zod.object({
  "name": zod.string().min(createClassroomBodyNameMin),
  "subject": zod.string(),
  "department": zod.string(),
  "semester": zod.string(),
  "description": zod.string().nullish()
});
const CreateClassroomResponse = zod.object({
  "id": zod.string(),
  "name": zod.string(),
  "subject": zod.string(),
  "department": zod.string(),
  "semester": zod.string(),
  "description": zod.string().nullish(),
  "inviteCode": zod.string(),
  "hostId": zod.string(),
  "hostName": zod.string().optional(),
  "memberCount": zod.number(),
  "isHost": zod.boolean().optional(),
  "createdAt": zod.coerce.date().optional()
});
const joinClassroomBodyInviteCodeMin = 6;
const joinClassroomBodyInviteCodeMax = 6;
const JoinClassroomBody = zod.object({
  "inviteCode": zod.string().min(joinClassroomBodyInviteCodeMin).max(joinClassroomBodyInviteCodeMax)
});
const JoinClassroomResponse = zod.object({
  "id": zod.string(),
  "name": zod.string(),
  "subject": zod.string(),
  "department": zod.string(),
  "semester": zod.string(),
  "description": zod.string().nullish(),
  "inviteCode": zod.string(),
  "hostId": zod.string(),
  "hostName": zod.string().optional(),
  "memberCount": zod.number(),
  "isHost": zod.boolean().optional(),
  "createdAt": zod.coerce.date().optional()
});
const GetClassroomParams = zod.object({
  "classroomId": zod.coerce.string()
});
const GetClassroomResponse = zod.object({
  "id": zod.string(),
  "name": zod.string(),
  "subject": zod.string(),
  "department": zod.string(),
  "semester": zod.string(),
  "description": zod.string().nullish(),
  "inviteCode": zod.string(),
  "hostId": zod.string(),
  "hostName": zod.string().optional(),
  "memberCount": zod.number(),
  "isHost": zod.boolean().optional(),
  "createdAt": zod.coerce.date().optional()
});
const UpdateClassroomParams = zod.object({
  "classroomId": zod.coerce.string()
});
const UpdateClassroomBody = zod.object({
  "name": zod.string().optional(),
  "description": zod.string().nullish()
});
const UpdateClassroomResponse = zod.object({
  "id": zod.string(),
  "name": zod.string(),
  "subject": zod.string(),
  "department": zod.string(),
  "semester": zod.string(),
  "description": zod.string().nullish(),
  "inviteCode": zod.string(),
  "hostId": zod.string(),
  "hostName": zod.string().optional(),
  "memberCount": zod.number(),
  "isHost": zod.boolean().optional(),
  "createdAt": zod.coerce.date().optional()
});
const GetClassroomMembersParams = zod.object({
  "classroomId": zod.coerce.string()
});
const GetClassroomMembersResponseItem = zod.object({
  "id": zod.string(),
  "name": zod.string(),
  "email": zod.string(),
  "reputation": zod.number(),
  "joinedAt": zod.coerce.date()
});
const GetClassroomMembersResponse = zod.array(GetClassroomMembersResponseItem);
const RemoveMemberParams = zod.object({
  "classroomId": zod.coerce.string(),
  "memberId": zod.coerce.string()
});
const RemoveMemberResponse = zod.object({
  "success": zod.boolean(),
  "message": zod.string().optional()
});
const GetClassroomStatsParams = zod.object({
  "classroomId": zod.coerce.string()
});
const GetClassroomStatsResponse = zod.object({
  "totalMembers": zod.number(),
  "totalApproved": zod.number(),
  "totalPending": zod.number(),
  "totalTokensAwarded": zod.number(),
  "topContributors": zod.array(zod.object({
    "id": zod.string(),
    "name": zod.string(),
    "reputation": zod.number(),
    "approvedCount": zod.number()
  }))
});
const GetClassroomResourcesParams = zod.object({
  "classroomId": zod.coerce.string()
});
const GetClassroomResourcesResponseItem = zod.object({
  "id": zod.string(),
  "title": zod.string(),
  "description": zod.string().nullish(),
  "type": zod.enum(["notes", "assignment", "ppt", "previous_year_paper", "lab_file"]),
  "fileUrl": zod.string(),
  "publicId": zod.string(),
  "fileName": zod.string(),
  "status": zod.enum(["pending", "approved", "rejected"]),
  "uploaderId": zod.string(),
  "uploaderName": zod.string(),
  "classroomId": zod.string(),
  "rejectionReason": zod.string().nullish(),
  "tokenReward": zod.number().optional(),
  "createdAt": zod.coerce.date()
});
const GetClassroomResourcesResponse = zod.array(GetClassroomResourcesResponseItem);
const UploadResourceParams = zod.object({
  "classroomId": zod.coerce.string()
});
const uploadResourceBodyTitleMin = 3;
const UploadResourceBody = zod.object({
  "title": zod.string().min(uploadResourceBodyTitleMin),
  "description": zod.string().nullish(),
  "type": zod.enum(["notes", "assignment", "ppt", "previous_year_paper", "lab_file"]),
  "fileUrl": zod.string(),
  "publicId": zod.string(),
  "fileName": zod.string()
});
const UploadResourceResponse = zod.object({
  "id": zod.string(),
  "title": zod.string(),
  "description": zod.string().nullish(),
  "type": zod.enum(["notes", "assignment", "ppt", "previous_year_paper", "lab_file"]),
  "fileUrl": zod.string(),
  "publicId": zod.string(),
  "fileName": zod.string(),
  "status": zod.enum(["pending", "approved", "rejected"]),
  "uploaderId": zod.string(),
  "uploaderName": zod.string(),
  "classroomId": zod.string(),
  "rejectionReason": zod.string().nullish(),
  "tokenReward": zod.number().optional(),
  "createdAt": zod.coerce.date()
});
const GetPendingResourcesParams = zod.object({
  "classroomId": zod.coerce.string()
});
const GetPendingResourcesResponseItem = zod.object({
  "id": zod.string(),
  "title": zod.string(),
  "description": zod.string().nullish(),
  "type": zod.enum(["notes", "assignment", "ppt", "previous_year_paper", "lab_file"]),
  "fileUrl": zod.string(),
  "publicId": zod.string(),
  "fileName": zod.string(),
  "status": zod.enum(["pending", "approved", "rejected"]),
  "uploaderId": zod.string(),
  "uploaderName": zod.string(),
  "classroomId": zod.string(),
  "rejectionReason": zod.string().nullish(),
  "tokenReward": zod.number().optional(),
  "createdAt": zod.coerce.date()
});
const GetPendingResourcesResponse = zod.array(GetPendingResourcesResponseItem);
const ApproveResourceParams = zod.object({
  "classroomId": zod.coerce.string(),
  "resourceId": zod.coerce.string()
});
const ApproveResourceResponse = zod.object({
  "id": zod.string(),
  "title": zod.string(),
  "description": zod.string().nullish(),
  "type": zod.enum(["notes", "assignment", "ppt", "previous_year_paper", "lab_file"]),
  "fileUrl": zod.string(),
  "publicId": zod.string(),
  "fileName": zod.string(),
  "status": zod.enum(["pending", "approved", "rejected"]),
  "uploaderId": zod.string(),
  "uploaderName": zod.string(),
  "classroomId": zod.string(),
  "rejectionReason": zod.string().nullish(),
  "tokenReward": zod.number().optional(),
  "createdAt": zod.coerce.date()
});
const RejectResourceParams = zod.object({
  "classroomId": zod.coerce.string(),
  "resourceId": zod.coerce.string()
});
const rejectResourceBodyReasonMin = 5;
const RejectResourceBody = zod.object({
  "reason": zod.string().min(rejectResourceBodyReasonMin)
});
const RejectResourceResponse = zod.object({
  "id": zod.string(),
  "title": zod.string(),
  "description": zod.string().nullish(),
  "type": zod.enum(["notes", "assignment", "ppt", "previous_year_paper", "lab_file"]),
  "fileUrl": zod.string(),
  "publicId": zod.string(),
  "fileName": zod.string(),
  "status": zod.enum(["pending", "approved", "rejected"]),
  "uploaderId": zod.string(),
  "uploaderName": zod.string(),
  "classroomId": zod.string(),
  "rejectionReason": zod.string().nullish(),
  "tokenReward": zod.number().optional(),
  "createdAt": zod.coerce.date()
});
const DownloadResourceParams = zod.object({
  "classroomId": zod.coerce.string(),
  "resourceId": zod.coerce.string()
});
const DownloadResourceResponse = zod.object({
  "downloadUrl": zod.string(),
  "tokensDeducted": zod.number().optional(),
  "newBalance": zod.number().optional()
});
const GetTokenHistoryResponseItem = zod.object({
  "id": zod.string(),
  "type": zod.enum(["earned", "spent"]),
  "amount": zod.number(),
  "description": zod.string(),
  "resourceTitle": zod.string().nullish(),
  "classroomName": zod.string().nullish(),
  "createdAt": zod.coerce.date()
});
const GetTokenHistoryResponse = zod.array(GetTokenHistoryResponseItem);
const GetNotificationsResponseItem = zod.object({
  "id": zod.string(),
  "type": zod.enum(["resource_approved", "resource_rejected", "removed_from_classroom"]),
  "message": zod.string(),
  "isRead": zod.boolean(),
  "resourceTitle": zod.string().nullish(),
  "classroomName": zod.string().nullish(),
  "rejectionReason": zod.string().nullish(),
  "createdAt": zod.coerce.date()
});
const GetNotificationsResponse = zod.array(GetNotificationsResponseItem);
const MarkAllNotificationsReadResponse = zod.object({
  "success": zod.boolean(),
  "message": zod.string().optional()
});
const MarkNotificationReadParams = zod.object({
  "notificationId": zod.coerce.string()
});
const MarkNotificationReadResponse = zod.object({
  "id": zod.string(),
  "type": zod.enum(["resource_approved", "resource_rejected", "removed_from_classroom"]),
  "message": zod.string(),
  "isRead": zod.boolean(),
  "resourceTitle": zod.string().nullish(),
  "classroomName": zod.string().nullish(),
  "rejectionReason": zod.string().nullish(),
  "createdAt": zod.coerce.date()
});
const GetUploadSignatureResponse = zod.object({
  "signature": zod.string(),
  "timestamp": zod.number(),
  "cloudName": zod.string(),
  "apiKey": zod.string(),
  "uploadPreset": zod.string()
});
const GetDashboardSummaryResponse = zod.object({
  "tokenBalance": zod.number(),
  "reputation": zod.number(),
  "classroomCount": zod.number(),
  "uploadedCount": zod.number(),
  "approvedCount": zod.number(),
  "pendingCount": zod.number(),
  "recentTransactions": zod.array(zod.object({
    "id": zod.string(),
    "type": zod.enum(["earned", "spent"]),
    "amount": zod.number(),
    "description": zod.string(),
    "resourceTitle": zod.string().nullish(),
    "classroomName": zod.string().nullish(),
    "createdAt": zod.coerce.date()
  })),
  "unreadNotificationCount": zod.number().optional()
});
export {
  ApproveResourceParams,
  ApproveResourceResponse,
  CreateClassroomBody,
  CreateClassroomResponse,
  DownloadResourceParams,
  DownloadResourceResponse,
  GetClassroomMembersParams,
  GetClassroomMembersResponse,
  GetClassroomMembersResponseItem,
  GetClassroomParams,
  GetClassroomResourcesParams,
  GetClassroomResourcesResponse,
  GetClassroomResourcesResponseItem,
  GetClassroomResponse,
  GetClassroomStatsParams,
  GetClassroomStatsResponse,
  GetDashboardSummaryResponse,
  GetMeResponse,
  GetMyClassroomsResponse,
  GetMyClassroomsResponseItem,
  GetNotificationsResponse,
  GetNotificationsResponseItem,
  GetPendingResourcesParams,
  GetPendingResourcesResponse,
  GetPendingResourcesResponseItem,
  GetTokenHistoryResponse,
  GetTokenHistoryResponseItem,
  GetUploadSignatureResponse,
  HealthCheckResponse,
  JoinClassroomBody,
  JoinClassroomResponse,
  LoginBody,
  LoginResponse,
  MarkAllNotificationsReadResponse,
  MarkNotificationReadParams,
  MarkNotificationReadResponse,
  RegisterBody,
  RegisterResponse,
  RejectResourceBody,
  RejectResourceParams,
  RejectResourceResponse,
  RemoveMemberParams,
  RemoveMemberResponse,
  UpdateClassroomBody,
  UpdateClassroomParams,
  UpdateClassroomResponse,
  UploadResourceBody,
  UploadResourceParams,
  UploadResourceResponse,
  createClassroomBodyNameMin,
  joinClassroomBodyInviteCodeMax,
  joinClassroomBodyInviteCodeMin,
  registerBodyNameMin,
  registerBodyPasswordMin,
  rejectResourceBodyReasonMin,
  uploadResourceBodyTitleMin
};
