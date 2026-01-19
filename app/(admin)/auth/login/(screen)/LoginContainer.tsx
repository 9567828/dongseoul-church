'use client';

import InputBox from '@/components/admin/ui/input-box/InputBox';
import style from '../../_components/login.module.scss';
import Button from '@/components/admin/ui/button/Button';
import { useHooks } from '@/hooks/useHooks';
import { FormEvent, useEffect, useRef, useState } from 'react';
import InfoMessage from '@/components/admin/ui/info-message/InfoMessage';
import { request } from '@/lib/api';
import Link from 'next/link';
import AuthLayout from '../../_components/AuthLayout';
import AuthWrapper from '../../_components/AuthWrapper';
import { checkAcceptAdmin } from '@/utils/supabase/sql/users/auth';

export default function LoginContainer({ reason }: { reason: string }) {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [err, setErr] = useState('');
  const { useResize, useOnClickOutSide, useRoute, useReplace } = useHooks();

  useEffect(() => {
    if (reason === 'invalid_token') {
      alert('인증을 다시 진행해 주세요');
      useReplace('/auth/login');
    }
  }, [reason]);

  const wrapRef = useRef<HTMLDivElement>(null);
  useOnClickOutSide(wrapRef, () => setOpen(false));

  const width = useResize();
  const isMob = width !== null && width <= 450;

  const hanleOnChange = (e: string, onChange: (e: string) => void) => {
    onChange(e);
    if (err) setErr('');
  };

  useEffect(() => {
    if (!isMob) {
      setOpen(false);
    }
  }, [width]);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (email.trim() === '' || password.trim() === '') {
      setErr('아이디 또는 비밀번호를 입력하세요');
      return;
    }

    const req = await request({ method: 'POST', url: '/auth/login', data: { email, password } });
    const { result } = await req;

    if (!result) {
      setErr('아이디 또는 비밀번호를 확인해 주세요');
    } else {
      const { result } = await checkAcceptAdmin();

      if (result) {
        useRoute('/admin/boards');
      } else {
        setErr('아이디 또는 비밀번호를 확인해 주세요');
        useReplace('/auth/login');
      }
    }
  };

  return (
    <AuthLayout open={open}>
      {isMob ? (
        <div className={`${style['mob-wrap']} ${open ? style.open : ''}`.trim()}>
          <div className={style.head}>
            <h1>관리자페이지</h1>
            <p>어서오세요🙌 관리자페이지 입니다</p>
          </div>
          {!open && <Button variants="trans" visual="none" btnName="로그인" onClick={() => setOpen(true)} />}
        </div>
      ) : null}
      <AuthWrapper variant="login" divRef={wrapRef} open={open} isMob={isMob}>
        <form className={style.form} onSubmit={onSubmit}>
          <div className={style['form-wrap']}>
            <InputBox
              id="id"
              variants="login"
              type="text"
              placeholder="이메일 아이디를 입력하세요"
              value={email}
              error={err !== ''}
              onChange={(e) => hanleOnChange(e.target.value, setEmail)}
            />
            <div>
              <InputBox
                id="password"
                variants="login"
                type="password"
                placeholder="비밀번호를 입력하세요"
                value={password}
                error={err !== ''}
                onChange={(e) => hanleOnChange(e.target.value, setPassword)}
              />
              {err !== '' && <InfoMessage mode="error" msg={err} />}
            </div>
            <div className={style['set-password']}>
              <Link href={'/auth/reset-password'}>비밀번호 재설정</Link>
            </div>
            <Button type="submit" btnName="로그인" variants="login" visual="none" />
          </div>
        </form>
      </AuthWrapper>
    </AuthLayout>
  );
}
