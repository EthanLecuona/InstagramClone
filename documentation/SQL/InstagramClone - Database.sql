-- DirectMessage Table
CREATE TABLE Message (
  directMessageID SERIAL PRIMARY KEY,
  senderID UUID NOT NULL REFERENCES auth.users(id), -- Supabase auth table
  receiverID UUID NOT NULL REFERENCES auth.users(id), -- Supabase auth table
  messageText TEXT NOT NULL,
  sentTimeStamp TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  readTimeStamp TIMESTAMP WITH TIME ZONE
);

-- Follow Table
CREATE TABLE Follow (
  followID SERIAL PRIMARY KEY,
  followingID UUID NOT NULL REFERENCES auth.users(id), -- Supabase auth table
  followerID UUID NOT NULL REFERENCES auth.users(id), -- Supabase auth table
  timeStamp TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- MediaType Table
CREATE TABLE MediaType (
  mediaTypeID SERIAL PRIMARY KEY,
  mimeType TEXT NOT NULL
);

-- Media Table
CREATE TABLE Media (
  mediaID SERIAL PRIMARY KEY,
  mediaTypeID INTEGER NOT NULL REFERENCES MediaType(mediaTypeID),-- Nullable because a media might not be attached to a post initially
  size INTEGER NOT NULL
);


-- Post Table
CREATE TABLE Post (
  postID SERIAL PRIMARY KEY,
  userID UUID NOT NULL REFERENCES auth.users(id),
  title TEXT,
  description TEXT,
  views INTEGER DEFAULT 0,
  timeStamp TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- PostMedia Table
CREATE TABLE PostMedia (
  postMediaID SERIAL PRIMARY KEY,
  postID INTEGER NOT NULL REFERENCES Post(postID),
  mediaID INTEGER NOT NULL REFERENCES Media(mediaID),
  count INTEGER NOT NULL
);
-- PostLike Table
CREATE TABLE PostLike (
  postLikeID SERIAL PRIMARY KEY,
  userID UUID NOT NULL REFERENCES auth.users(id),
  postID INTEGER NOT NULL REFERENCES Post(postID),
  timeStamp TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Comment Table
CREATE TABLE Comment (
  commentID SERIAL PRIMARY KEY,
  postID INTEGER NOT NULL REFERENCES Post(postID),
  userID UUID NOT NULL REFERENCES auth.users(id), -- Supabase auth table
  commentText TEXT NOT NULL,
  timeStamp TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE CommentLike (
  commentLikeID SERIAL PRIMARY KEY,
  commentID INTEGER NOT NULL REFERENCES Comment(commentID),
  userID UUID NOT NULL REFERENCES auth.users(id), -- Supabase auth table
  timeStamp TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Profile Table
CREATE TABLE Profile (
  profileID SERIAL PRIMARY KEY,
  userID UUID NOT NULL REFERENCES auth.users(id),
  username TEXT NOT NULL,
  fullName TEXT,
  avatarUrl TEXT,
  bio TEXT
);

-- Story Table
CREATE TABLE Story (
  storyID SERIAL PRIMARY KEY,
  mediaID INTEGER NOT NULL REFERENCES Media(mediaID),
  userID UUID NOT NULL REFERENCES auth.users(id),
  comment TEXT,
  timeStamp TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- StoryMedia Table
CREATE TABLE StoryMedia (
  storyMediaID SERIAL PRIMARY KEY,
  storyID INTEGER NOT NULL REFERENCES Story(storyID),
  mediaID INTEGER NOT NULL REFERENCES Media(mediaID),
  size INTEGER NOT NULL
);

-- GeneralSettings Table
CREATE TABLE GeneralSettings (
  genSettingID SERIAL PRIMARY KEY,
  language TEXT NOT NULL,
  darkMode BOOLEAN NOT NULL
);

-- NotificationSettings Table
CREATE TABLE NotificationSettings (
  notifSettingID SERIAL PRIMARY KEY,
  pushNotifications BOOLEAN NOT NULL
);

-- PrivacySettings Table
CREATE TABLE PrivacySettings (
  privSettingID SERIAL PRIMARY KEY,
  lastSeen BOOLEAN NOT NULL,
  publicProfile BOOLEAN NOT NULL,
  invisible BOOLEAN NOT NULL
);

-- SecuritySettings Table
CREATE TABLE SecuritySettings (
  secSettingID SERIAL PRIMARY KEY,
  twoFactorAuth BOOLEAN NOT NULL,
  loginAlerts BOOLEAN NOT NULL,
  trustedDevices TEXT[] -- PostgreSQL supports arrays, so we can use it for storing a list
);

-- UserSettings Table
CREATE TABLE UserSettings (
  settingID SERIAL PRIMARY KEY,
  userID UUID NOT NULL REFERENCES auth.users(id),
  generalSettings INTEGER REFERENCES GeneralSettings(genSettingID),
  notificationSettings INTEGER REFERENCES NotificationSettings(notifSettingID),
  securitySettings INTEGER REFERENCES SecuritySettings(secSettingID)
);