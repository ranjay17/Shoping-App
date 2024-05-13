import { body, validationResult } from "express-validator";

const validRequest = async (req, res, next)=>{
    //validate data
    // 1. setup the rules for validation
    const rules = [
        body('name').notEmpty().withMessage('name is required'),
        body('price').isFloat({gt: 0}).withMessage('price should be a positive value'),
        body('imageUrl').isURL().withMessage('invalid url'),
    ];
    // 2. run those rules
    await Promise.all(
    rules.map((rule) => rule.run(req))
  );


    // 3. check if there are any errors after running the rules.
    var validationErrors = validationResult(req);


    if (!validationErrors.isEmpty()) {
    return res.render('new-product', {
        errorMessage: validationErrors.array()[0].msg,
    })
}
    next();
}

export default validRequest;