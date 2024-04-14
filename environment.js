import * as process from "node:process";
import 'dotenv/config'

export const BASE_PATH = process.env.BASE_PATH || "/"
export const PORT = process.env.PORT || "3000"