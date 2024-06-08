export interface CommentLike {
  commentLikeID: number; // PK
  commentID: number; // FK
  userID: number; // FK
  timeStamp: Date;
}

export interface Comment {
  commentID: number; // PK
  postID: number; // FK
  userID: number; // FK
  commentText: string;
  timeStamp: Date;
}

export interface DirectMessage {
  directMessageID: number; // PK
  senderID: number; // FK
  receiverID: number; // FK
  messageText: string;
  sentTimeStamp: Date;
  readTimeStamp: Date;
}

export interface Follow {
  followID: number; // PK
  followingID: number; // FK
  followerID: number; // FK
  timeStamp: Date;
}

export interface Media {
  mediaID: number; // PK
  mediaTypeID: number; // FK
  postID: number; // FK
  size: number;
}

export interface MediaType {
  mediaTypeID: number; // PK
  mimeType: string;
}

export interface Post {
  postID: number; // PK
  mediaID: number; // FK
  userID: string; // FK
  title: string;
  description: string;
  views: number;
  timeStamp: Date;
}

export interface PostLike {
  postLikeID: number; // PK
  userID: string; // FK
  postID: number; // FK
  timeStamp: Date;
}

export interface PostMedia {
  postMediaID: number; // PK
  postID: number; // FK
  mediaID: number; // FK
  count: number;
}

export interface Profile {
  profileID: number; // PK
  userID: string; // FK
  username: string;
  fullName: string;
  avatarUrl: string;
  bio: string;
}

export interface Story {
  storyID: number; // PK
  mediaID: number; // FK
  userID: string; // FK
  comment: string;
  timeStamp: Date;
}

export interface StoryMedia {
  storyMediaID: number; // PK
  storyID: number; // FK
  mediaID: number; // FK
  size: number;
}

export interface UserSettings {
  settingID: number; // PK
  userID: string; // FK
  generalSettings: number; // FK
  notificationSettings: number; // FK
  securitySettings: number; // FK
}

export interface GeneralSettings {
  genSettingID: number; // PK
  language: string;
  darkMode: boolean;
}

export interface NotificationSettings {
  notifSettingID: number; // PK
  pushNotifications: boolean;
}

export interface PrivacySettings {
  privSettingID: number; // PK
  lastSeen: boolean;
  publicProfile: boolean;
  invisible: boolean;
}

export interface SecuritySettings {
  secSettingID: number; // PK
  twoFactorAuth: boolean;
  loginAlerts: boolean;
  trustedDevices: string[];
}

// And so on for the remaining entities in the ERD...

export interface User {
  email?: string | null;
  mobileNumber?: string | null;
  username?: string | null;
  fullname?: string | null;
  avatarUrl?: string | null;
  accessToken?: string | null;
  isAuthenticated?: boolean;
}
