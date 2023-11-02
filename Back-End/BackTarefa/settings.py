import psycopg2

#configurações

host= 'localhost'
user= 'postgres'
password= 'postgres'
dbname= 'tarefa'
port= '5000'

DATABASE_URL = 'host={0} port={1} user={2} dbname={3} password={4}'.format(host , port, user, dbname, password)

CONECTION = psycopg2.connect(DATABASE_URL)