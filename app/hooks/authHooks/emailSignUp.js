import supabase from "@/app/components/supabaseClient"

const emailSignUp = async ({email, password}) => {
    
    const { user, error } = await supabase.auth.signUp({
      email,
      password,
    })
    if (error) {console.log('Error:', error)
throw (error)}
    else console.log('User signed up:', user)
  }

  
export default emailSignUp;