(async () => {
  try {
    const signinRes = await fetch('http://localhost:3000/api/auth/signin', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'admin@gmail.com', password: 'admin123' }),
    });
    console.log('signin status', signinRes.status);
    const signinBody = await signinRes.json();
    console.log('signin body', signinBody);
    if (!signinBody.token) {
      console.error('Token missing');
      process.exit(1);
    }

    const token = signinBody.token;

    const recordRes = await fetch('http://localhost:3000/api/financial/records', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
      body: JSON.stringify({
        amount: 150,
        type: 'income',
        category: 'salary',
        date: '2026-04-03',
        notes: 'node test record',
      }),
    });

    console.log('record status', recordRes.status);
    console.log('record body', await recordRes.json());
    process.exit(0);
  } catch (err) {
    console.error('fail', err);
    process.exit(1);
  }
})();
