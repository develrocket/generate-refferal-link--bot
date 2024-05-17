const { Bot, session } = require('grammy');
const mysql = require("mysql2/promise");

const bot = new Bot('7073005052:AAFqiwMohNZcq0JR2HzUVTIAwBRGROml73U'); // Replace with your actual bot token

// Middleware to handle private messages and channel messages
bot.use(session());

// Handle the /start command
bot.command("start", async (ctx) => {
    // Get the original link (e.g., "t.me/your_bot?start=ref_77eh8")
    if(ctx.message.text.indexOf("ref_") > -1){
        const originalLink = ctx.message.text.split(" ")[1]; // Assuming the link is the first word after "/start"

        // Extract the code (e.g., "77eh8" == channel id)
        const code = originalLink.split("_")[1];
    
        // Store the code or perform any other action
        const query = `INSERT INTO link_table (user_name, user_id, chat_id) VALUES ('${ctx.from.username}', '${ctx.from.id}', '${code}')`;

        try {
            const pool = mysql.createPool('mysql://root:@localhost:3306/telegram');
            const connection = await pool.getConnection();
            // Execute a query
            connection.query(query);
            // Close the pool when done
            connection.release();
        } catch (error) {
            console.error("Error executing query:", error);
        }
        
        ctx.reply("Received code: " + code);
    }else{
        ctx.reply("You are not user referraled by admin.");
    }
    
});

// Start the bot (using long polling)
bot.start();