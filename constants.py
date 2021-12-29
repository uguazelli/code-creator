db = "database.db"




#SQL
sql_register = "INSERT INTO user (company_name, first_name, last_name, email, password) values (?,?,?,?,?)"
sql_login = "SELECT password FROM user WHERE email = ?"