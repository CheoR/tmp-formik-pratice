# BuiltFormik

Practice using Formik and creating npm packages.

# Intall

```code
npm i builtformik
```

# Use

Pass callback `redirectToOnSuccess` and url `url` as to where app should redirect to on successful submit.

```code
import { LoanForm } from 'builtformik';


<LoanForm redirectToOnSuccess={history} url="/" />
```
