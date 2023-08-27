/**
 * Index file
 * Runs application
 */

import BaseServer from "./server";
import * as dotenv from "dotenv";
dotenv.config();

const server = new BaseServer();

server.routing();
server.connectDB();
