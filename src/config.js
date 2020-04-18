module.exports = {
    PORT: process.env.PORT || 8000,
    NODE_ENV: process.env.NODE_ENV || 'development',
    DB_URL: 'postgresql://dunder_mifflin@localhost/reflect',
    TEST_DB_URL: process.env.TEST_DB_URL || 'postgresql://dunder_mifflin@localhost/reflect_test',
    CLIENT_ORIGIN: '*'
}