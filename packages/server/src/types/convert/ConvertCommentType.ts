import { Comment } from "@prisma/client";
import ConvertUserType from "src/types/convert/ConvertUserType";

type ConvertCommentType = Comment & {
  Commenter: ConvertUserType;
};

export default ConvertCommentType;
