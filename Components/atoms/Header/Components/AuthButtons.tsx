"use client";

import Button from "../../Button/Button";
import { ButtonVariant, ButtonSize } from "@/enums";
import Link from "next/link";

const AuthButtons = () => {

    return (
        <div className="flex items-center">
            <Link href="/login">
                <Button variant={ButtonVariant.VANILLA} size={ButtonSize.MEDIUM}>Login</Button>
            </Link>
            <Link href="/signup">
                <Button variant={ButtonVariant.PRIMARY} size={ButtonSize.MEDIUM}>Sign Up</Button>
            </Link>
        </div>
    );
};

export default AuthButtons;