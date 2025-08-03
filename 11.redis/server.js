const redis = require('redis')

const client = redis.createClient({
    host: 'localhost',
    port: 6379
})

//event listener
client.on('error', (error) => console.log('Redis client error occured', error)
)

async function testRedisConnection(){
    try {
        await client.connect()
        console.log('Connected to redis server');

        await client.set("name","value")

        const extractValue= await client.get("name")

        console.log(extractValue);

        const deleteCount = await client.del("name")
        console.log(deleteCount);
        
        const extractUpdatedValue = await client.get("name")
        console.log(extractUpdatedValue);
        
        
    } catch (error) {
        console.log(error);
        
    }finally{
        await client.quit();
    }
}

testRedisConnection()