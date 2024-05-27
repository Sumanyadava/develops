import User from "../models/user.models.js";

const checkin = async (req,res) => {
    const {email,inTime} = req.body
    
    try {
      const user = await User.findOne({email})
  
      if(!user){
        res.status(400).json({'message':"user not found"})
      } 
      else{
        
      if(!inTime){
        return res.status(400).json({ message: 'inTime is required' });
      }
        const newTime = {
          inTime:inTime 
        } 
        user.inOutTime.push(newTime)
        await user.save()
        res.status(200).json({'message':"check in successful"})
      }
    } catch (error) {
      res.status(404).json({'message':"connection failed"})
    }
  }


  const checkout = async (req,res) => {
    const {email,outTime} = req.body;
    try {
      const user = await User.findOne({email})
      if(!user){
        return res.status(404).json({ message: 'User not found' });
      }
      if(!outTime){
        return res.status(400).json({ message: 'outTime is required' });
      }
        const lastIndex = (user.inOutTime.length) -1
        user.inOutTime[lastIndex].outTime = outTime
        await user.save()
        res.status(400).json({'message':"check out successful"})  
    } catch (error) {
      console.error('Error during checkout:', error);
      res.status(200).json({'message':"error during checkout"})
    }
  }
  
export { checkin,checkout };