import * as dotenv from "dotenv"

export class Config {

    public static environmentCurrently(){
        const result = dotenv.config();
        if (result.error) {
          throw result.error;
        }
        const { parsed: envs } = result;

        return {
            "server": {
                "host": envs?.CONFIG_SERVER_URL,
                "port": envs?.CONFIG_SERVER_PORT
            },
            "database": {
                "db": envs?.CONFIG_DATABASE_DB,
                "host": envs?. CONFIG_DATABASE_HOST,
                "username": envs?.CONFIG_DATABASE_USERNAME,
                "password": envs?.CONFIG_DATABASE_PASSWORD,
                "logging": envs?.CONFIG_DATABASE_LOGGING.toUpperCase() == "TRUE",
                "port":envs?.CONFIG_DATABASE_PORT
            },
            "key": {
                "privateKey": envs?.CONFIG_KEY_PRIVATEKEY,
                "tokenExpiry": envs?.CONFIG_TOKENEXPIRY
            }
        };
    }

    public static databaseInfo():any{
        const info = this.environmentCurrently();
        return info.database;
    }

    public static serverInfo():any{
        const info = this.environmentCurrently();
        return info.server;
    }

    public static keyInfo():any{
        const info = this.environmentCurrently();
        return info.key;
    }
}