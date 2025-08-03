const redis = require('redis')

const client = redis.createClient({
    host: 'localhost',
    port: 6379
})

//event listener
client.on('error', (error) => console.log('Redis client error occured', error)
)

async function redisDataStructure() {
    try {
        await client.connect()
        //strings -> SET,GET,MSET,MGET

        // await client.set("user:name", "Tejash")
        // const name = client.get("user:name")
        // console.log(name);

        // await client.mSet(["user:email", "tejash@gmail.com","user:age","60","user:country","india"])
        // const [email,age,country]= await client.mGet(["user:email","user:age","user:country"])
        
        // //lists -> lpush , rpush, lrange , lpop , rpop
        // // await client.lPush('notes',['note 1','note 2' , 'note 3'])
        // const extractAllNotes = await client.lRange('notes',0,-1)
        // console.log(extractAllNotes);
        
        // const firstTask = await client.lPop('notes')
        // console.log(firstTask);

       // //sets -> SADD , SMEMBERS , SISMEMBER , SREM

        // await client.sAdd('user:nickName' , ['john','varun','xyz']);
        // const extractUserNickName = await client.sMembers("user:nickName");
        // console.log(extractUserNickName);
        
        // const isVarunPresent = await client.sIsMember("user:nickName","varun");
        // console.log(isVarunPresent);
        
        // await client.sRem("user:nickName","varun","xyz")

        // const getUpdatedNickName = await client.sMembers("user:nickName")
        // console.log(getUpdatedNickName);

        // // sorted sets -> ZADD , ZRANGE , ZRANK , ,ZREM

       
        // // hashes -> HSET , HGET , HGETALL , HDEL

        await client.hSet('product1',{
            name : 'product 1',
            description : 'product one description',
            rating: "5"
        })

        const getProductRating = await client.hGet("product1","rating")
        console.log(getProductRating);
        
        const getProductDetails = await client.hGetAll('product1')
        console.log(getProductDetails);
        
        await client.hDel('product1',"rating");
        
        const updatedProductDetails = await client.hGetAll('product1')
        console.log(updatedProductDetails);
        
        
        
    } catch (error) {
        console.log(error);
        
    }finally{
        client.quit()
    }
}

redisDataStructure()