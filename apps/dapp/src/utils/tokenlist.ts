import Ajv from "ajv";
import addFormats from "ajv-formats";
import tokenlistSchema from ".././tokenlist.schema.json";

export function validateTokenlist(list: object) {
  const ajv = new Ajv({ allErrors: true, verbose: true });
  addFormats(ajv);

  const validator = ajv.compile(tokenlistSchema);

  const isValid = validator(list);

  if (isValid) return isValid;

  if (validator.errors) {
    throw validator.errors.map((error) => {
      delete error.data;
      return error;
    });
  }
}
