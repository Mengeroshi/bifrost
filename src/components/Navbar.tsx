import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router";
import { useAccount, useDisconnect, useEnsAvatar, useEnsName } from "wagmi";
import { Badge } from "./ui/badge";
import { normalize } from "viem/ens";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

export const Navbar = () => {
  const navigate = useNavigate();
  const { address, isConnected, chain } = useAccount();
  const { disconnect } = useDisconnect();
  useEffect(() => {
    if (isConnected === false) {
      navigate("/login");
    }
  }, [isConnected]);

  const { data: ensName, error, status } = useEnsName({ address });
  const { data: avatar } = useEnsAvatar({
    name: normalize(ensName || ""),
  });

  return (
    <div>
      <nav className="flex items-center justify-between py-2 px-4 border-4 border-border bg-bw fixed top-0 w-full">
        <div className="text-5xl">Bifrost</div>

        {isConnected && (
          <div className="flex items-center gap-2">
            <Badge variant="neutral">{chain?.name}</Badge>
            <Badge>{ensName}</Badge>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Avatar>
                  <AvatarImage src={avatar || ""} />
                  <AvatarFallback>0X</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem
                    onClick={() => {
                      disconnect();
                    }}
                  >
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        )}
      </nav>
      <main className="min-h-[calc(100vh-72px)] mt-[72px] bg-bg border-border border-b-4 border-x-4 p-4">
        <Outlet />
      </main>
    </div>
  );
};
