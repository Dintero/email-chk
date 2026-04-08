# email-chk
Check if an email address contains a typo and suggest the correct one.

## Usage
Conventional Typescript:
```ts
import { EmailChk } from '@dintero/email-chk';

const emailChk = EmailChk({
    domains: ['gmail.com', 'hotmail.com', 'yahoo.com'],
    levensteinThreshold: 3,
});

const email = "username@gmain.com";
const result = emailChk(email); // username@gmail.com
```
TLD checking with `checkMissingTLD`:
```ts
import { EmailChk } from '@dintero/email-chk';

const emailChk = EmailChk();

// Suggests a TLD when one is missing or unrecognised
emailChk('username@example', { checkMissingTLD: ['com'] });
// → username@example.com

// Supports multi-part TLDs such as co.uk
emailChk('username@example.co', { checkMissingTLD: ['co.uk'] });
// → username@example.co.uk

// Known providers are resolved to their correct domain instead
emailChk('username@gmail.co', { checkMissingTLD: ['co.uk'] });
// → username@gmail.com  (gmail is in the default domains list)
```
React:
```tsx
import { EmailChk } from '@dintero/email-chk';

const App = () => {
    const [email, setEmail] = useState('');
    const [suggestion, setSuggestion] = useState('');

    const emailChk = EmailChk({
        domains: ['gmail.com', 'hotmail.com', 'yahoo.com'],
        levensteinThreshold: 3,
    });

    const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        setEmail(value);
        setSuggestion(emailChk(value)); // username@gmail.com
    }, [email]);

    return (
        <div>
            <input type="text" value={email} onChange={handleChange} />
            {suggestion && <p>Did you mean {suggestion}?</p>}
        </div>
    );
};
```
