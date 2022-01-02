db = "database.db"




#SQL
sql_register = "INSERT INTO user ( first_name, last_name, email, password) values (?,?,?,?)"
sql_login = "SELECT password FROM user WHERE email = ?"
sql_rooms = "SELECT r.* from 'user' u, room r where r.company_id = u.company_id and u.email = ?"
sql_room_by_id = "SELECT * FROM room WHERE id = ?"
sql_update_number_room = "UPDATE room SET actual_number = ? WHERE id = ?"
sql_update_last_number_room = "UPDATE room SET last_number = ? WHERE id = ?"
sql_update_password = "UPDATE user SET password = ? , reset_pass_token = '' , reset_pass_expiry_date = '' WHERE email = ?"
