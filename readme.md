docker run --name mysql -e MYSQL_ROOT_PASSWORD=abu0418 -p 3306:3306 -d mysql:8.0

node.js提供的mysql包中的加密方式为caching_sha2_passwod

ALTER USER 'root'@'%' IDENTIFIED WITH mysql_native_password BY '12345678';
flush privileges;
