const mainURL = process.env.NEXT_PUBLIC_API_URL;

export const serverAddress = `${mainURL}`

if (process.env.MODE === 'test') {
    console.log('Running in test mode');
} else if (process.env.MODE === 'production') {
    console.log('Running in production mode');
} else if (process.env.MODE === 'development') {
    console.log('Running in development mode');
}