import { Course } from "./Course";
import { User } from "./User";

export class Enrollment{
    enrollmentId:number;
    levelOfUser:number;
    user:User;
    course:Course;
}