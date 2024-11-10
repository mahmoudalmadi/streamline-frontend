import supabase from "@/app/components/supabaseClient"

const emailLogIn = async ({email, password}) => {
    const { user, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })
    if (error) console.log('Error:', error)
    else console.log('User signed in:', user)
  }

export default emailLogIn;