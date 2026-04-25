import Link from "next/link";
import Image from "next/image";

const navLinks = [
  { name: "About", href: "/" },
  { name: "Works", href: "/works" },
  { name: "Contact", href: "#contact" },
];

export default function Footer() {
  return (
    <footer className="bg-[#0a0a0a] border-t border-white/5 px-6 md:px-10 pt-16 pb-8">
      <div className="max-w-7xl mx-auto">

        {/* Top row */}
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-12 mb-16">

          {/* Brand */}
          <div className="space-y-5 max-w-xs">
            <Link href="/">
              <Image
                src="/images/thatdaytimelogowt.png"
                alt="TDTT"
                width={240}
                height={96}
                className="h-14 w-auto"
              />
            </Link>
            <p className="text-white/40 text-sm leading-relaxed">
              병원의 본질을 담아내는<br />
              디지털 크리에이티브 스튜디오.
            </p>
          </div>

          {/* Nav + Contact */}
          <div className="flex flex-col sm:flex-row gap-12 md:gap-20">
            <div className="space-y-4">
              <p className="text-white/20 text-[10px] font-bold tracking-[0.25em] uppercase">Menu</p>
              <ul className="space-y-3">
                {navLinks.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-white/60 hover:text-white text-sm font-medium transition-colors duration-200"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-4">
              <p className="text-white/20 text-[10px] font-bold tracking-[0.25em] uppercase">Contact</p>
              <ul className="space-y-3">
                <li>
                  <a
                    href="mailto:hibestme2@naver.com"
                    className="text-white/60 hover:text-white text-sm font-medium transition-colors duration-200"
                  >
                    hibestme2@naver.com
                  </a>
                </li>
                <li>
                  <a
                    href="tel:010-8522-9499"
                    className="text-white/60 hover:text-white text-sm font-medium transition-colors duration-200"
                  >
                    010-8522-9499
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/5 pt-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">

            <div className="space-y-1">
              <p className="text-white/20 text-xs">
                © {new Date().getFullYear()} TDTT Studio. All rights reserved.
              </p>
              <p className="text-white/15 text-xs">
                사업자등록번호: 그날그때 741-33-01715
              </p>
            </div>

            {/* Legal */}
            <div className="flex items-center gap-4 text-xs text-white/20">
              <Link href="/privacy" className="hover:text-white/50 transition-colors duration-200">
                개인정보처리방침
              </Link>
              <span>·</span>
              <Link href="/terms" className="hover:text-white/50 transition-colors duration-200">
                이용약관
              </Link>
            </div>

          </div>
        </div>

      </div>
    </footer>
  );
}
