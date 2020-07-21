import controller from "./../controllers/main.js";

export default [
  {
    method: "GET",
    path: "/",
    handler: controller.index,
  },
];
