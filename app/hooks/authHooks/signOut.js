import supabase from "@/app/components/supabaseClient"

const signOut = async () => {
    const { error } = await supabase.auth.signOut()
    if (error) console.log('Error:', error)
    else console.log('User signed out')
  }

  
export default signOut;