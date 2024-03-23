interface CommentLike {
  commentLikeID: number; // PK
  commentID: number; // FK
  userID: number; // FK
  timeStamp: Date;
}

interface Comment {
  commentID: number; // PK
  postID: number; // FK
  userID: number; // FK
  commentText: string;
  timeStamp: Date;
}

interface DirectMessage {
  directMessageID: number; // PK
  senderID: number; // FK
  receiverID: number; // FK
  messageText: string;
  sentTimeStamp: Date;
  readTimeStamp: Date;
}

interface Follow {
  followID: number; // PK
  followingID: number; // FK
  followerID: number; // FK
  timeStamp: Date;
}

interface Media {
  mediaID: number; // PK
  mediaTypeID: number; // FK
  postID: number; // FK
  size: number;
}

interface MediaType {
  mediaTypeID: number; // PK
  mimeType: string;
}

interface Post {
  postID: number; // PK
  mediaID: number; // FK
  userID: string; // FK
  title: string;
  description: string;
  views: number;
  timeStamp: Date;
}

interface PostLike {
  postLikeID: number; // PK
  userID: string; // FK
  postID: number; // FK
  timeStamp: Date;
}

interface PostMedia {
  postMediaID: number; // PK
  postID: number; // FK
  mediaID: number; // FK
  count: number;
}

interface Profile {
  profileID: number; // PK
  userID: string; // FK
  username: string;
  fullName: string;
  avatarUrl: string;
  bio: string;
}

interface Story {
  storyID: number; // PK
  mediaID: number; // FK
  userID: string; // FK
  comment: string;
  timeStamp: Date;
}

interface StoryMedia {
  storyMediaID: number; // PK
  storyID: number; // FK
  mediaID: number; // FK
  size: number;
}

interface UserSettings {
  settingID: number; // PK
  userID: string; // FK
  generalSettings: number; // FK
  notificationSettings: number; // FK
  securitySettings: number; // FK
}

interface GeneralSettings {
  genSettingID: number; // PK
  language: string;
  darkMode: boolean;
}

interface NotificationSettings {
  notifSettingID: number; // PK
  pushNotifications: boolean;
}

interface PrivacySettings {
  privSettingID: number; // PK
  lastSeen: boolean;
  publicProfile: boolean;
  invisible: boolean;
}

interface SecuritySettings {
  secSettingID: number; // PK
  twoFactorAuth: boolean;
  loginAlerts: boolean;
  trustedDevices: string[];
}

// And so on for the remaining entities in the ERD...
