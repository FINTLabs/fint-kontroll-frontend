import MeInfo from '~/components/app-bar/MeInfo';
import { IMeInfo } from '~/data/types/userTypes';
import { BodyShort, Button, Hide, HStack, Page } from '@navikt/ds-react';
import { Link } from '@remix-run/react';
import { ApiMenu } from '~/components/app-bar/ApiMenu';
import { LeaveIcon } from '@navikt/aksel-icons';

export function AppBar({ me, basePath }: { me?: IMeInfo; basePath?: string }) {
    return (
        <Page.Block as={'header'} className={'novari-header h-20'}>
            <HStack
                as="nav"
                justify="space-between"
                align="center"
                className={'h-full'}
                paddingInline={{ xs: '12', sm: '12', md: '12', lg: '20', xl: '32' }}>
                <HStack align="center">
                    <Link to={'/'} className={'kontroll'} id={'header-logo'}>
                        <BodyShort weight="semibold" size={'large'}>
                            FINT Kontroll
                        </BodyShort>
                    </Link>
                </HStack>

                <HStack align="center" gap={'12'}>
                    {me ? <ApiMenu me={me} /> : null}
                    <HStack align="center" gap={'2'}>
                        {me ? (
                            <Hide below="lg" asChild>
                                <MeInfo me={me} />
                            </Hide>
                        ) : null}
                        {me ? (
                            <Button
                                size={'small'}
                                variant="tertiary"
                                icon={<LeaveIcon aria-hidden />}
                                rel="external noopener noreferrer"
                                target="_blank"
                                as="a"
                                href={`${basePath}/_oauth/logout`}>
                                Logg ut
                            </Button>
                        ) : null}
                    </HStack>
                </HStack>
            </HStack>
        </Page.Block>
    );
}
