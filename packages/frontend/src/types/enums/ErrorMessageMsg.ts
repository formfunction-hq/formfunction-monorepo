enum ErrorMessageMsg {
  CampaignNameTaken = "You already have a campaign with the same name",
  EmailTaken = "Email is already taken",
  InvalidEmail = "Please enter a valid email address",
  InvalidInputs = "Please make sure all inputs are valid",
  InvalidMaxPrice = "The max price must be greater than the starting price",
  InvalidSeriesDescriptionLength = "The series description can be at most 1000 characters",
  InvalidSeriesNameLength = "The series name can be at most 32 characters",
  InvalidSeriesSlug = "Another series that you created uses the same URL. Please try another name.",
  InvalidSeriesSlugLength = "This series uses invalid URL. Please try another name",
  InvalidUsername = "Please enter a valid username",
  RequiredInputsMissing = "Please make sure all required fields are set",
  UnexpectedError = "An unexpected error occurred",
  UnexpectedTransactionError = "Unexpected transaction error",
  UsernameTaken = "Username is already taken",
}

export default ErrorMessageMsg;
