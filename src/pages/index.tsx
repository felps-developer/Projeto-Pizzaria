import Head from 'next/head';
import Image from 'next/image';
import styles from '../../styles/home.module.scss'

import logoImg from '../../public/logo.svg'
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import Link from 'next/link';
import { FormEvent, useContext, useState } from 'react';
import { AuthContext } from '@/contexts/AuthContext';
import { toast } from 'react-toastify';
import { GetServerSideProps } from 'next';
import { canSSRGuest } from '@/utils/canSSRGuest';



export default function Home() {
  const {signIn} = useContext(AuthContext)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [loading, setLoading] = useState(false)

  async function handleLogin(event: FormEvent){
    event.preventDefault();
    
    if(email === '' || password === ''){
      toast.warning("Preencha todos aos campos!")
      return;
    }

    setLoading(true);

    let data = {
      email,
      password
    }
    
    await signIn(data)


    setLoading(false)
  }
 


  return (
    
    <>
      <Head>
        <title>Sujeito - Faça seu login</title>
      </Head>
      <div className={styles.containerCenter}>
        <Image src={logoImg} alt='Logo Sujeito Pizzaria' />
        <div className={styles.login}>
          <form onSubmit={handleLogin}>
            <Input placeholder='Digite seu email' type='text' 
            value={email}
            onChange={(e) => setEmail(e.target.value)}/>
            <Input placeholder='Sua senha' type='password'
             value={password}
             onChange={(e) => setPassword(e.target.value)} />
            <Button type='submit' loading={loading}
            >
              Acessar
            </Button>

          </form>
          <Link href="/signup" legacyBehavior>
            <a className={styles.text}>Não possui uma conta? Cadastre-se</a>
          </Link>
        </div>
      </div>
    </>

  );
}

export const getServerSideProps = canSSRGuest(async (ctx) => {

  return{
    props:{}
  }
})


