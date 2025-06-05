const { exec } = require('child_process'); // To run external commands

/**
 * @route POST /api/dev/seed-db
 * @desc Endpoint to seed the database (development only).
 * @access Private (but usually for dev, so simple checks are fine)
 */
exports.seedDatabase = (req, res) => {
    // IMPORTANT: Ensure this endpoint is ONLY active in development!
    if (process.env.NODE_ENV !== 'development') {
        return res.status(403).json({ message: 'This endpoint is for development use only.' });
    }

    // Execute the seeder script as a child process
    exec('node seeder.js', (error, stdout, stderr) => {
        if (error) {
            console.error(`exec error: ${error}`);
            return res.status(500).json({ message: 'Failed to seed database', error: stderr });
        }
        console.log(`stdout: ${stdout}`);
        console.error(`stderr: ${stderr}`); // stderr might contain success messages from console.log
        res.status(200).json({ message: 'Database seeding initiated successfully!', output: stdout + stderr });
    });
};

/**
 * @route POST /api/dev/destroy-db
 * @desc Endpoint to destroy all database data (development only).
 * @access Private
 */
exports.destroyDatabase = (req, res) => {
    if (process.env.NODE_ENV !== 'development') {
        return res.status(403).json({ message: 'This endpoint is for development use only.' });
    }

    exec('node seeder.js -d', (error, stdout, stderr) => {
        if (error) {
            console.error(`exec error: ${error}`);
            return res.status(500).json({ message: 'Failed to destroy database', error: stderr });
        }
        console.log(`stdout: ${stdout}`);
        console.error(`stderr: ${stderr}`); // stderr might contain success messages from console.log
        res.status(200).json({ message: 'Database destruction initiated successfully!', output: stdout + stderr });
    });
};