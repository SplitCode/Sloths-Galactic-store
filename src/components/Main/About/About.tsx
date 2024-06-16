import styles from './About.module.css';
import spaceman from '../../../assets/img/spaceman.png';
import { useCallback, useState } from 'react';
import { Member } from './Member';
import { Accordion } from './Accordion/Accordion';
import type { MemberData } from '../../../helpers/membersConfig';
import { AboutUsInfo, members } from '../../../helpers/membersConfig';

export function About() {
  const [selectedMember, setSelectedMember] = useState<MemberData | null>(null);

  const memberClickHandler = useCallback((member: MemberData) => {
    setSelectedMember(member);
  }, []);

  const closeMemberHandler = useCallback(() => {
    setSelectedMember(null);
  }, []);

  return (
    <section className={styles.bg}>
      <h1 className={styles.title}>О нас</h1>
      <div className={styles.info}>
        <Accordion data={AboutUsInfo} />
      </div>
      <ul className={styles.people}>
        {members.map((member: MemberData) => (
          <li className={styles.astronaut} key={member.name} onClick={() => memberClickHandler(member)}>
            <img src={spaceman} alt={member.name} />
          </li>
        ))}
      </ul>
      {selectedMember && <Member member={selectedMember} onClose={closeMemberHandler} />}
    </section>
  );
}
