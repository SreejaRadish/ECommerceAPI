const Pool=require('pg').Pool;
const pool=new Pool({
user: "postgres",
password: "postgres",
database: "ECommerceDB",
host: "localhost",
port: 5432
}
);

module.exports=pool;