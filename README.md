# chat-space DB設計
## usersテーブル
| Column | Type | Options |
|:------:|:----:|:-------:|
|user_name|string|null: false|
|email|string|null: false|
|password|string|null: false|
### Association
- has_many :messages
- has_many :groups, through: :groups_users

##groupsテーブル
| Column | Type | Options |
|:------:|:----:|:-------:|
|group_name|string|null :false|
### Association
- has_many :users, through: :groups_users
- belongs_to :message

##groups_usersテーブル
| Column | Type | Options |
|:------:|:----:|:-------:|
|user_id|integer|null :false, foreign_key: true|
|group_id|integer|null :false, foreign_key: true|
### Association
- belongs_to :user
- belongs_to :group

## messagesテーブル
| Column | Type | Options |
|:------:|:----:|:-------:|
|body|text|null :false|
|image|text||
|group_id|integer|null :false, foreign_key: true|
|user_id|integer|null :false, foreign_key: true|
### Association
- belongs_to :user
- belongs_to :group