# Mean Starter

## 1. Contents

## 2. Features

### 2.1. Client Features

### 2.2. Server Features

#### 2.2.1. User creation

#### 2.2.2. Permissions

Permissions define whether specific actions can be performed. These are atomic values and will be related to all user accounts.

The definitive list of permissions includes:
* VIEW
  * VIEW_SELF
  * VIEW_USER
  * VIEW_USERS
* EDIT
  * EDIT_SELF
  * EDIT_USER
* DELETE
  * DELETE_SELF
  * DELETE_USER

Permissions can be protected - meaning once created they cannot be deleted. This is important to avoid accidently preventing a user from being able to delete their account - which would be illegal under GDPR.

#### 2.2.3. Permission Groups

Permission can belong to permission groups. This makes mass assignment of permissions easier. Example permission groups could include:
* Creator Deletion (if you created it you can delete it)
* Creator Editing
* General Deletion (you can delete anything)
* General Editing

A permission can belong to multiple permission groups.

#### 2.2.4. Roles

Roles define a base set of permissions that are attributed to a user. Changing a user role will replace all previous permissions with the base permissions of their new role. This is similar to giving them all the permissions in a permission group.

A permission can belong to multiple roles.

## Testing

### Client Testing

### Server Testing

## Glossary