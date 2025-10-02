import { motion } from 'framer-motion';
import { Linkedin, Mail, Star, Trophy, Award } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';

// Import leader images
import ahmedMagdyImg from '@/assets/leaders/ahmed-magdy.jpg';
import marwaImamImg from '@/assets/leaders/marwa-imam.jpg';

const leadershipTeam = [
    {
        id: 'ceo',
        name: 'Ahmed Magdy',
        role: 'Track Leader',
        track: 'Leadership',
        avatar: ahmedMagdyImg,
        bio: 'Passionate about building inclusive communities and empowering students to reach their full potential.',
        skills: ['Leadership', 'Community Building', 'Strategic Planning'],
        social: {
            linkedin: 'https://www.linkedin.com/in/ahmed-magdy-023536240',
            email: 'mailto:ahmed20magdi05@gmail.com',
        },
        level: 'leader',
    },
   

];

const trackHeads = [{ id: 'frontend-5', name: 'Mohammed Hossam', role: 'Frontend Development Technical', track: 'Frontend Development', avatar: '', bio: 'Passionate frontend developer dedicated to creating seamless and engaging user experiences. Always eager to learn new technologies and optimize web performance.', skills: ['Communication', 'Problem Solving', 'Attention to Detail'], social: { linkedin: '#', email: '#' }, level: 'technical' }, { id: 'frontend-6', name: 'Abdul Rahman Ibrahim', role: 'Frontend Development Technical', track: 'Frontend Development', avatar: '', bio: 'Passionate frontend developer dedicated to creating seamless and engaging user experiences. Always eager to learn new technologies and optimize web performance.', skills: ['Communication', 'Problem Solving', 'Attention to Detail'], social: { linkedin: '#', email: '#' }, level: 'technical' }, { id: 'frontend-3', name: 'Malak Yahya', role: 'Frontend Development Technical', track: 'Frontend Development', avatar: '', bio: 'Passionate frontend developer dedicated to creating seamless and engaging user experiences. Always eager to learn new technologies and optimize web performance.', skills: ['Communication', 'Problem Solving', 'Attention to Detail'], social: { linkedin: '#', email: '#' }, level: 'technical' }, { id: 'frontend-4', name: 'Mai Galal', role: 'Frontend Development Technical', track: 'Frontend Development', avatar: '', bio: 'Passionate frontend developer dedicated to creating seamless and engaging user experiences. Always eager to learn new technologies and optimize web performance.', skills: ['Communication', 'Problem Solving', 'Attention to Detail'], social: { linkedin: '#', email: '#' }, level: 'technical' }, { id: 'frontend-1', name: 'Mariam Fadel', role: 'Frontend Development Technical', track: 'Frontend Development', avatar: '', bio: 'Passionate frontend developer dedicated to creating seamless and engaging user experiences. Always eager to learn new technologies and optimize web performance.', skills: ['Communication', 'Problem Solving', 'Attention to Detail'], social: { linkedin: '#', email: '#' }, level: 'technical' }, { id: 'frontend-2', name: 'Mariam Mohammed', role: 'Frontend Development Technical', track: 'Frontend Development', avatar: '', bio: 'Passionate frontend developer dedicated to creating seamless and engaging user experiences. Always eager to learn new technologies and optimize web performance.', skills: ['Communication', 'Problem Solving', 'Attention to Detail'], social: { linkedin: '#', email: '#' }, level: 'technical' }, { id: 'frontend-7', name: 'Menna Mohammed', role: 'Frontend Development Technical', track: 'Frontend Development', avatar: '', bio: 'Passionate frontend developer dedicated to creating seamless and engaging user experiences. Always eager to learn new technologies and optimize web performance.', skills: ['Communication', 'Problem Solving', 'Attention to Detail'], social: { linkedin: '#', email: '#' }, level: 'technical' }, { id: 'frontend-8', name: 'Menatallah Badr', role: 'Frontend Development Technical', track: 'Frontend Development', avatar: '', bio: 'Passionate frontend developer dedicated to creating seamless and engaging user experiences. Always eager to learn new technologies and optimize web performance.', skills: ['Communication', 'Problem Solving', 'Attention to Detail'], social: { linkedin: '#', email: '#' }, level: 'technical' },  { id: 'frontend-10', name: 'Fatima Magdy', role: 'Frontend Development Technical', track: 'Frontend Development', avatar: '', bio: 'Passionate frontend developer dedicated to creating seamless and engaging user experiences. Always eager to learn new technologies and optimize web performance.', skills: ['Communication', 'Problem Solving', 'Attention to Detail'], social: { linkedin: '#', email: '#' }, level: 'technical' },    { id: 'frontend-14', name: 'Aya Hatem', role: 'Frontend Development Technical', track: 'Frontend Development', avatar: '', bio: 'Passionate frontend developer dedicated to creating seamless and engaging user experiences. Always eager to learn new technologies and optimize web performance.', skills: ['Communication', 'Problem Solving', 'Attention to Detail'], social: { linkedin: '#', email: '#' }, level: 'technical' }, { id: 'frontend-15', name: 'Mostafa Abdel Sattar', role: 'Frontend Development Technical', track: 'Frontend Development', avatar: '', bio: 'Passionate frontend developer dedicated to creating seamless and engaging user experiences. Always eager to learn new technologies and optimize web performance.', skills: ['Communication', 'Problem Solving', 'Attention to Detail'], social: { linkedin: '#', email: '#' }, level: 'technical' }, { id: 'frontend-16', name: 'Omar Ayoub', role: 'Frontend Development Technical', track: 'Frontend Development', avatar: '', bio: 'Passionate frontend developer dedicated to creating seamless and engaging user experiences. Always eager to learn new technologies and optimize web performance.', skills: ['Communication', 'Problem Solving', 'Attention to Detail'], social: { linkedin: '#', email: '#' }, level: 'technical' },];
const allLeaders = [...leadershipTeam, ...trackHeads];

export default function Leaders() {
    const getLevelColor = (level: string) => {
        switch (level) {
            case 'leader':
                return 'from-primary to-accent';
            case 'vice head':
                return 'from-accent to-primary';
            case 'technical':
                return 'from-success to-primary';
            case 'vice-head':
                return 'from-destructive to-primary';
            default:
                return 'from-muted to-muted-foreground';
        }
    };

    const getLevelBadge = (level: string) => {
        switch (level) {
            case 'leader':
                return 'Track Head';
            case 'vice head':
                return 'Vice Head';
            case 'technical':
                return 'Track Technical';
            case 'vice-head':
                return 'Vice Head';
            default:
                return 'Member';
        }
    };

    const getLevelIcon = (level: string) => {
        switch (level) {
            case 'leader':
                return <Star className="w-3 h-3" />;
            case 'vice head':
                return <Trophy className="w-3 h-3" />;
            case 'technical':
                return <Award className="w-3 h-3" />;
            case 'vice-head':
                return <Star className="w-3 h-3" />;
            default:
                return null;
        }
    };

    return (
        <div className="min-h-screen pt-20 bg-background-dark" dir='ltr'>
            {/* Hero Section */}
            <section className="py-20  text-center text-primary-foreground">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="space-y-8"
                >
                    <h1 className="text-4xl sm:text-6xl font-bold">Our Team</h1>
                    <p className="text-xl max-w-3xl mx-auto text-primary-light">
                        Meet the passionate individuals who guide our community, mentor our
                        members, and drive innovation across all learning tracks.
                    </p>
                </motion.div>
            </section>

            {/* Leadership Team */}
            <section className="py-20 container-custom">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-foreground">
                        Leadership Team
                    </h2>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        The visionaries who founded and continue to guide our community
                        toward excellence.
                    </p>
                </motion.div>

                <div className="grid  gap-8 max-w-7xl mx-auto">
                    {leadershipTeam.map((leader, index) => (
                        <motion.div
                            key={leader.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            viewport={{ once: true }}
                        >
                            <Card className="bg-black/40 h-full group shadow-xl hover:shadow-2xl transition-shadow duration-300 rounded-2xl">

                                <CardContent className="p-6 relative overflow-hidden">
                                    <div className="text-center space-y-4 relative z-10">
                                        <motion.div whileHover={{ scale: 1.05 }}>
                                            <Avatar className="w-56 h-56 mx-auto ring-2 ring-primary/30 group-hover:ring-primary/50 transition-all duration-300">
                                                <AvatarImage src={leader.avatar} alt={leader.name} />
                                                <AvatarFallback className="bg-gradient-to-br from-primary/20 to-primary/10 text-xl ">
                                                    <span className="text-foreground">
                                                        {leader.name
                                                            .split(' ')
                                                            .map((n) => n[0])
                                                            .join('')}
                                                    </span>
                                                </AvatarFallback>
                                            </Avatar>
                                        </motion.div>

                                        <div className="space-y-2">
                                            <motion.h3 className="text-2xl font-bold text-white">
                                                {leader.name}
                                            </motion.h3>
                                            <p className="text-sm text-muted-foreground font-medium">
                                                {leader.role}
                                            </p>
                                            <Badge
                                                className={`text-xs bg-gradient-to-r ${getLevelColor(
                                                    leader.level
                                                )} text-white border-0 shadow-md px-3 py-1 font-semibold`}
                                            >
                                                {getLevelIcon(leader.level)}
                                                <span className="mr-2">
                                                    {getLevelBadge(leader.level)}
                                                </span>
                                            </Badge>
                                        </div>

                                        <p className="text-sm text-muted-foreground leading-relaxed">
                                            {leader.bio}
                                        </p>

                                        <div className="bg-muted/20 rounded-md p-3">
                                            <h4 className="font-semibold text-sm mb-2 text-primary">
                                                Core Skills
                                            </h4>
                                            <div className="flex flex-wrap gap-2 justify-center">
                                                {leader.skills.map((skill, i) => (
                                                    <Badge
                                                        key={i}
                                                        variant="secondary"
                                                        className="text-xs hover:bg-primary/20 transition-colors duration-200 text-white"
                                                    >
                                                        {skill}
                                                    </Badge>
                                                ))}
                                            </div>
                                        </div>

                                        <div className="flex justify-center space-x-2 gap-8">
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                className="w-8 h-8 bg-primary hover:bg-primary/20 hover:text-primary transition-colors duration-200"
                                            >
                                                <a
                                                    href={leader.social.linkedin}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                >
                                                    <Linkedin className="w-3 h-3" />
                                                </a>
                                            </Button>
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                className="w-8 h-8 bg-primary hover:bg-destructive/20 hover:text-destructive transition-colors duration-200"
                                            >
                                                <a
                                                    href={leader.social.email}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                >
                                                    <Mail className="w-3 h-3" />
                                                </a>
                                            </Button>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Track Leaders */}
            <section className="py-20 ">
                <div className="container-custom">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-white">
                            Track Technical
                        </h2>
                        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                            Expert professionals and mentors who lead our specialized learning
                            tracks.
                        </p>
                    </motion.div>

                    <div className="grid sm:grid-cols-2 gap-8">
                        {trackHeads.map((leader, index) => (
                            <motion.div
                                key={leader.id}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                                viewport={{ once: true }}
                            >
                                <Card className="bg-black/40 h-full group shadow-xl hover:shadow-2xl transition-shadow duration-300 rounded-2xl">

                                    <CardContent className="p-6 relative overflow-hidden">
                                        <div className="text-center space-y-4 relative z-10">
                                            <motion.div whileHover={{ scale: 1.05 }}>
                                                <Avatar className="w-40 h-40 mx-auto ring-2 ring-primary/30 group-hover:ring-primary/50 transition-all duration-300">
                                                    <AvatarImage src={leader.avatar} alt={leader.name} />
                                                    <AvatarFallback className="bg-gradient-to-br from-primary/20 to-primary/10">
                                                        {leader.name
                                                            .split(' ')
                                                            .map((n) => n[0])
                                                            .join('')}
                                                    </AvatarFallback>
                                                </Avatar>
                                            </motion.div>

                                            <motion.h3 className="text-lg font-bold text-white">
                                                {leader.name}
                                            </motion.h3>
                                            <p className="text-sm text-muted-foreground font-medium">
                                                {leader.role}
                                            </p>
                                            <Badge
                                                className={`text-xs bg-gradient-to-r ${getLevelColor(
                                                    leader.level
                                                )} text-white border-0 shadow-md px-3 py-1 font-semibold`}
                                            >
                                                {getLevelIcon(leader.level)}
                                                <span className="mr-2">
                                                    {getLevelBadge(leader.level)}
                                                </span>
                                            </Badge>

                                            <p className="text-sm text-muted-foreground leading-relaxed">
                                                {leader.bio}
                                            </p>

                                            <div className="bg-muted/20 rounded-md p-3">
                                                <h4 className="font-semibold text-sm mb-2 text-primary">
                                                    Top Skills
                                                </h4>
                                                <div className="flex flex-wrap gap-1 justify-center">
                                                    {leader.skills.slice(0, 3).map((skill, i) => (
                                                        <Badge
                                                            key={i}
                                                            variant="secondary"
                                                            className="text-xs text-white hover:bg-primary/20 transition-colors duration-200"
                                                        >
                                                            {skill}
                                                        </Badge>
                                                    ))}
                                                </div>
                                            </div>

                                            <div className="flex justify-center space-x-2 gap-8">
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    className="w-8 h-8 bg-primary hover:bg-primary/20 hover:text-primary transition-colors duration-200"
                                                >
                                                    <a
                                                        href={leader.social.linkedin}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                    >
                                                        <Linkedin className="w-3 h-3" />
                                                    </a>
                                                </Button>
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    className="w-8 h-8 bg-primary hover:bg-destructive/20 hover:text-destructive transition-colors duration-200"
                                                >
                                                    <a
                                                        href={leader.social.email}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                    >
                                                        <Mail className="w-3 h-3" />
                                                    </a>
                                                </Button>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
