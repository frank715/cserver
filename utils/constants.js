require("dotenv").config();

const STATUS_COMPLETED = "Completed";
const DEFAULT_STATUS = process.env.DEFAULT_STATUS;

const defaultStage = {
  "Yet to Start": "Open",
  Assigned: "Open",
  Query: "Open",
  "In Progress": "Open",
  Delivered: "Open",
  Feedback: "Open",
  "Re Delivered": "Open",
  Approved: "Open",
};

const YET_TO_START = "Yet to start";
const ASSIGNED = "Assigned";
const QUERY = "Query";
const IN_PROGRESS = "In Progress";
const DELIVERED = "Delivered";
const FEEDBACK = "Feedback";
const RE_DELIVERED = "Re Delivered";
const APPROVED = "Approved";

const INVENTORY = "Inventory";
const PRODUCTION = "Production";
const QUALITY_CONTROL = "QC";
const QUALITY_ANALYSIS = "QA";
const DELIVERY = "Delivery";
const STATUS_QUERY = "Query";
const STATUS_APPROVED = "Approved";

const JOB_STATUSES = {
  YET_TO_START,
  ASSIGNED,
  QUERY,
  IN_PROGRESS,
  DELIVERED,
  FEEDBACK,
  RE_DELIVERED,
  APPROVED,
  INVENTORY,
  PRODUCTION,
  QUALITY_CONTROL,
  QUALITY_ANALYSIS,
  DELIVERY,
  STATUS_QUERY,
};

const RAISED = "Raised";
const CUSTOMER_REVIEW = "Customer Review";
const RESOLVED = "Resolved";
const INTERNALLY_RESOLVED = "Internally Resolved";
const CANCELLED = "Cancelled";
const IMPLEMENTED = "Implemented";
const CLOSED = "Closed";
const FORWARD_TO_LANGUAGE_EXPERT = "Forward to Language Expert";
const READY_TO_IMPLEMENT = "Ready to Implement";

const QUERY_STATUS = {
  RAISED,
  CUSTOMER_REVIEW,
  RESOLVED,
  INTERNALLY_RESOLVED,
  CANCELLED,
  IMPLEMENTED,
  CLOSED,
  FORWARD_TO_LANGUAGE_EXPERT,
  READY_TO_IMPLEMENT,
};

const CUSTOMER = "Customer";
const USER = "User";
const INTERNAl = "Internal";
const RESOLUTION_PROVIDED = "Resolution Provided";

const ADMIN = "Admin";
const CLIENT = "Client";
const TRANSLATOR = "Translator";

const RESOLUTION_TYPE = {
  CUSTOMER,
  USER,
  INTERNAl,
};

const USER_TYPE = {
  ADMIN,
  CLIENT,
  USER,
  TRANSLATOR,
};

module.exports = {
  STATUS_COMPLETED,
  DEFAULT_STATUS,
  JOB_STATUSES,
  QUERY_STATUS,
  RESOLUTION_TYPE,
  RESOLUTION_PROVIDED,
  USER_TYPE,
  REDIS_CACHE_DURATION: 60,
};
