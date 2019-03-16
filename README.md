# README

This README would normally document whatever steps are necessary to get the
application up and running.

Things you may want to cover:

* Ruby version

* System dependencies

* Configuration

* Database creation

* Database initialization

* How to run the test suite

* Services (job queues, cache servers, search engines, etc.)

* Deployment instructions

# DB設計

## users table

|Column|Type|Options|
|------|----|-------|
|name|string|index: true, null: false unique: true|
|mail|string|null: false, unique: true|

### Association
- has_many :groups, through: :group_users
- has_many :messages
- has_many :group_users


## groups table

|Column|Type|Options|
|------|----|-------|
|name|text|null: false|

### Association
- has_many :users, through: :group_users
- has_many :group_users
- has_many :messages


## group_users table

|Column|Type|Options|
|------|----|-------|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|

### Association
- begongs_to :group
- begongs_to :user


## messages table

|Column|Type|Options|
|------|----|-------|
|text|text||
|image|string||
|user_id|integrer|null: false, foreign_key: true|
|group_id|integrer|null: false, foreign_key: true|

### Association
- begongs_to :group
- begongs_to :user
