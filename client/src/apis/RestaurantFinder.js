import axios from "axios";


// const baseURL = "http://localhost:4000/api/v1/restaurants"

const baseURL = process.env.NEXT_PUBLIC_API_PREFIX === "production"
    ? "api/v1/restaurants"
    : "http://localhost:4000/api/v1/restaurants"

export default axios.create({
  baseURL,
})

