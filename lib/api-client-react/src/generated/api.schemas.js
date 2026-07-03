const ResourceInputType = {
  notes: "notes",
  assignment: "assignment",
  ppt: "ppt",
  previous_year_paper: "previous_year_paper",
  lab_file: "lab_file"
};
const ResourceType = {
  notes: "notes",
  assignment: "assignment",
  ppt: "ppt",
  previous_year_paper: "previous_year_paper",
  lab_file: "lab_file"
};
const ResourceStatus = {
  pending: "pending",
  approved: "approved", 
  rejected: "rejected"
};
const TokenTransactionType = {
  earned: "earned",
  spent: "spent"
};
const NotificationType = {
  resource_approved: "resource_approved",
  resource_rejected: "resource_rejected",
  removed_from_classroom: "removed_from_classroom"
};
export {
  NotificationType,
  ResourceInputType,
  ResourceStatus,
  ResourceType,
  TokenTransactionType
};
