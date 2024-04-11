import { Request, Response } from "express";
import Project from "../models/project.js";

export const projectDetailView = async (req: Request, res: Response) => {
  console.log('project1',parseInt(req.params.id))
  const project = await Project.getById(parseInt(req.params.id, 10));
  
  res.render("project", {
    project: project,
    owner: await project.getOwner(),
  });
};
